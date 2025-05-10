import  {useState, useEffect} from 'react'
import { motion } from 'framer-motion';
import { saveSearchTerm } from "../utils/localStorage";
import ToastContainer from './ToastContainer';
import RecentSearches from "./ResentSearches";
const DictionaryApp = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [synonyms, setSynonyms]= useState([]);
  const [favorites, setFavorites] = useState([]);



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
   const addToFavorites = (word) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, word];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to localStorage
      return updatedFavorites;
    });
  };
   // Remove from favorites
   const removeFromFavorites = (word) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((item) => item !== word);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update in localStorage
      return updatedFavorites;
    });
  };
   // Load favorites from localStorage on mount
   useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);


  const handleRecentClick = (word) => {
    setWord(word);
    fetchWordDefinition();
  };

  return (
    <section className='container' >{/*initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>*/}
    <div>
      <motion.h1 className="title" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <h1>Dictionary App</h1>
        </motion.h1>
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
              <div>
                <h3>Synonyms:</h3>
                <ul>
                  {synonyms.map((synonym, index) => (
                    <li key={index}>{synonym}</li>
                  ))}
                </ul>
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
  
        <div>
          <h3>Your Favorites</h3>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((favorite, index) => (
                <li key={index}>
                  {favorite} 
                  <button onClick={() => removeFromFavorites(favorite)}>Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No favorite words yet!</p>
          )}
        </div>
        </div>
        <RecentSearches onSelect={handleRecentClick} />
      </section>
    );
  };
  


export default DictionaryApp;
