//import React from 'react';
import { render, screen, waitFor, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import DictionaryApp from './components/DictionaryApp'; 
import { test, expect,describe } from 'vitest';
import App from './App'
import { afterEach, beforeAll, afterAll } from 'vitest';
import { setupServer } from "msw/node";
import { http} from "msw";
import example from './example.json';


const server = setupServer(
  http.get('https://api.dictionaryapi.dev/api/v2/entries/en/:word', (req, res, ctx) =>
    res(ctx.json(example))
  )
)


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Component', () => {
 test('should display an error message when input is empty and search is clicked', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Please fill in the field with a word')).toBeInTheDocument();
    });
  });

  test('should display word and definition after submission', async () => {
    render(<DictionaryApp />);
 
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'example');
  
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);
    screen.debug(); 
  
    const displayedWord = await screen.findByTestId('wordDefinition');
    expect(displayedWord).toHaveTextContent(/example/i);
    // If you want to check for the definition as well
    expect(screen.getByText(/Something that is representative of all such things in a group/i)).toBeInTheDocument();
  });
  
  
  });
  
/*test('should display word and definition after submission', async () => {
  render(<DictionaryApp />);

  const user = userEvent.setup();

  const input = screen.getByRole('textbox');
  await user.type(input, 'example');

  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);

  expect(await screen.findByText("example")).toBeInTheDocument(); 
  expect(await screen.findByText(/A thing characteristic of its kind or illustrating a general rule/i)).toBeInTheDocument();
  screen.debug() 
});
  /*const wordInput= await screen.getByLabelText(/search a word here/);
  fireEvent.change(wordInput, {target:{value:'example'}});
  expect(wordInput).toHaveValue('example');

  const meaningDefinition= await screen.getElementById("wordDefinition")
expect(meaningDefinition).toBe(/A thing characteristic of its kind or illustrating a general rule./i);*/



/*test('should display phonetics bar if phonetics data is available', async () => {
  render(<DictionaryApp />);

  const user = userEvent.setup();
  
  // Type a valid word and click the search button
  const input = screen.getByRole('textbox');
  await user.type(input, 'example');

  const searchButton = screen.getByRole('button', { name: /search/i });
  await user.click(searchButton);
  screen.debug(); 
  const phoneticText = await screen.findByText((content, element) => content.includes('/ɪɡˈzæmpl̩/'));
  expect(phoneticText).toBeInTheDocument();

  // Check if the audio element is rendered
  const audioElement = screen.getByRole('audio');
  expect(audioElement).toBeInTheDocument();
});
})*/
