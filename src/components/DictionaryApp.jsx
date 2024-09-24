import  {useState} from 'react'
const DictionaryApp = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  const fetchWordDefinition = async () => {
    if (word.trim() === '') {
      setError("Please fill in the field with a word");
      setDefinition(null);
      return;
    }

    setError(null);
    setDefinition(null);

    try {
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
      } else {
        setError('No definitions found');
      }
    } catch (error) {
      setError('Try again...');
      console.error('Fetch error:', error);
    }
  };

  return (
    <section className='container'>
      <div>
        <h1>Dictionary App</h1>
        <input
          type='text'
          placeholder='Search a word here'
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={fetchWordDefinition}>Search</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

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

            {/* Display phonetic and audio if available */}
            {definition.phonetics && definition.phonetics.length > 0 && definition.phonetics[0].audio && (
              <div>
                 {/*<p>Phonetic: {definition.phonetics[0].text}</p>*/}
                <audio controls  data-testid="audio-player">
                  <source src={definition.phonetics[0].audio} type='audio/mpeg' />
                 
                </audio>
              </div>
            )}

            {/* Display source URL if available */}
            {/* {definition.sourceUrls && definition.sourceUrls.length > 0 && (
               <p>
                Source: <a href={definition.sourceUrls[0]}>{definition.sourceUrls[0]}</a>
              </p>
            )}*/}
          </div>
        )}
      </div>
    </section>
  );
};

export default DictionaryApp;
