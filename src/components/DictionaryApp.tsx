import React from 'react';
import  {useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { saveSearchTerm ,getFavorites, saveFavorite, removeFavorite} from "../utils/localStorage";
import ToastContainer from './ToastContainer';
import RecentSearches from "./ResentSearches";


type Definition = {
  word: string;
  phonetics?: { text?: string; audio?: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
    }[];
  }[];
};

const DictionaryApp = () => {
  const [word, setWord] = useState<string>('');
  const [definition, setDefinition] =useState<Definition | null>(null);
  const [error, setError] = useState<string | null>(null);;
  const [synonyms, setSynonyms]= useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

// Fetch Synonyms from Datamuse API
const fetchSynonyms = async (word) => {
  try {
    const response = await fetch(`https://api.datamuse.com/words?rel_syn=${word}`);
    const data = await response.json();
    return data.map(item => item.word);
  } catch (error) {
    console.error('Error fetching synonyms:', error);
    return [];
  }
};

  const fetchWordDefinition = async () => {
    if (word.trim() === '') {
      setError("Please fill in the field with a word");
      setDefinition(null);
     
      return;
    }
    saveSearchTerm(word.trim());
    try { setError(null);
    setDefinition(null);

   
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      console.log('Raw response:', response);

      if (!response.ok) {
        setError('The word cannot be found');
        return; // Stop further execution if there's an error
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      // Check if data is an array and contains at least one entry
      if (Array.isArray(data) && data.length > 0) {
        setDefinition(data[0]); // Set the first result as the definition
        const synonymsData = await fetchSynonyms(word);
        setSynonyms(synonymsData);

      } else {
        setError('No definitions found');
      }
    } catch (error) {
      setError('Try again...');
      console.error('Fetch error:', error);
    }
  };


   // Add to favorites (localStorage)
   const addToFavorites = (word: string) => {
    const updated = saveFavorite(word);
    setFavorites(updated);
  };
  
    
  const removeFromFavorites = (word: string) => {
    const updated = removeFavorite(word);
    setFavorites(updated);
  };




  const handleRecentClick = (word) => {
    setWord(word);
    fetchWordDefinition();
  };

  return (
    <section className='container'>
    <div>
      <motion.div className="title" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <h1>Dictionary App</h1>
      </motion.div>
        <input
          type='text'
          placeholder='Search a word here'
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        
        <button onClick={fetchWordDefinition}>Search</button>
       
        <ToastContainer message={error} onClose={() => setError(null)} />

        {definition && (
          <div data-testid="wordDefinition">
            <h2>{definition.word}</h2>

            {/* Display part of speech, definition, and phonetic */}
            {definition.meanings && definition.meanings.length > 0 && (
              <div>
              
            {/*  <p><strong>Part of Speech:</strong> {definition.meanings[0].partOfSpeech}</p>*/}
                <p><strong>Definition:</strong> {definition.meanings[0].definitions[0].definition}</p> 
              </div>
            )}
             {synonyms.length > 0 && (
            <div className="synonyms-list">
            <h3>Synonyms:</h3>
            <div className="synonymListContainer">
            <ul>
            {synonyms.map((synonym, index) => (
            <li key={index} className="synonymItem">{synonym}</li>
              ))}
              </ul>
             </div>
            </div>
           )}
            {/* Display phonetic and audio if available */}
            {definition.phonetics && definition.phonetics.length > 0 && definition.phonetics[0].audio && (
              <div>
                 {/*<p>Phonetic: {definition.phonetics[0].text}</p>*/}
                <audio controls  data-testid="audio-player">
                  <source src={definition.phonetics[0].audio} type='audio/mpeg' />
                 
                </audio>
              </div>
            )}

            {/* Add to Favorites button */}
            <button onClick={() => addToFavorites(definition.word)}>Add to Favorites</button>
          </div>
        )}
  
        <RecentSearches onSelect={handleRecentClick} 
                  favorites={favorites}
                  onRemoveFavorite={removeFromFavorites}/>
        </div>
      </section>
    );
  };
  


export default DictionaryApp;
