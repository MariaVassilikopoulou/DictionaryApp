import { render, screen, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import DictionaryApp from './components/DictionaryApp'; 
import { test, expect,describe } from 'vitest';
import App from './App'


describe('App Component', () => {
 test('should display an error message when input is empty and search is clicked', async () => {
    // Render the App component 
  render(<App />);

    fireEvent.click(screen.getByText('Search'));
 // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Please fill in the field with a word')).toBeInTheDocument();
    });
  });

  test('should display word and definition after submission', async () => {
     // Render the DictionaryApp component
    render(<DictionaryApp />);
  // Find the input field and type the word 'example'
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'example');
   // Find and click the search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
    // Debug the screen
    screen.debug(); 
   // Find the displayed word by its heading role
    const displayedWord = await screen.findByRole('heading', { name: /example/i });
    expect(displayedWord).toBeInTheDocument();
    // If you want to check for the definition as well
    expect(screen.getByText(/Something that is representative of all such things in a group/i)).toBeInTheDocument();
  });
  
  
  });

  test('should display an audio player if the phonetic audio file exists', async () => {
    // Render the component
    render(<DictionaryApp />);
    // Find the input box and type a word
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'example'); 
    // Click the search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
    // Wait for the API response to update the DOM
    await waitFor(() => {
      // Debug the screen
      screen.debug(); 
      // Find the audio player using data-testid
      const audioPlayer = screen.getByTestId('audio-player');
      expect(audioPlayer).toBeInTheDocument();
    });
  });

