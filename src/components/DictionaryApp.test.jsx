/*import React from 'react';
import { render, screen,  waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DictionaryApp from './DictionaryApp';
import { test, expect } from 'vitest';



test.only('should display word and definition after submission', async () => {
    render(<DictionaryApp />);
  
    const user = userEvent.setup();
  
    // Use getByPlaceholderText to find the input field by its placeholder
    const input = screen.getByPlaceholderText('search a word here');
    await user.type(input, 'example');
  
    // Find and click the search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);
  
    // Wait for and verify the word and its definition are displayed
   // expect(await screen.findByText('example')).toBeInTheDocument();
    await waitFor(() => {
        const theWord = screen.findByText('example');
        expect(theWord).toBeInTheDocument();
        expect(theWord).toHaveTextContent('example');
        
      // const theMeaning= screen.findByTextt('Something that is representative of all such things in a group');
      //  expect(theMeaning).toBeInTheDocument(); 
      //  expect(theMeaning).toHaveTextContent('Something that is representative of all such things in a group') 
   // })
    });
    screen.debug(); 
   // const theWord = await screen.findByText((content, element) => content.startsWith('example'));
  // expect(theWord).toBeInTheDocument(); 

  // Check if the definition is displayed
  expect(await screen.findByText(/A thing characteristic of its kind or illustrating a general rule/i)).toBeInTheDocument();
});


   // expect(await screen.findByText(/Something that is representative of all such things in a group./i)).toBeInTheDocument();

  test('displays dictionary data from the mock API', async () => {
    render(<DictionaryApp />);
  
    expect(await screen.findByText('example')).toBeInTheDocument();
    expect(await screen.findByText('/əɡˈzæmpl̩/')).toBeInTheDocument();
    expect(await screen.findByText('Something that is representative of all such things in a group.')).toBeInTheDocument();
  });

  test('fetches and displays word definition', async () => {
    render(<DictionaryApp />);
  
    const input = screen.getByPlaceholderText('search a word here');
    fireEvent.change(input, { target: { value: 'example' } });
  
    const button = screen.getByText('Search');
    fireEvent.click(button);
  
    const wordDefinition = await screen.findByTestId('wordDefinition');
    expect(wordDefinition).toHaveTextContent('example');
  });

  test('should display word and definition after submission', async () => {
    render(<DictionaryApp />);
  
    const user = userEvent.setup();
  
    // Type the word 'example' into the input field
    const input = screen.getByPlaceholderText('search a word here');
    await user.type(input, 'example');
  
    // Click the search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);
  
    // Check if the word and definition are displayed
    expect(await screen.findByText('example')).toBeInTheDocument();
    expect(await screen.findByText(/Something that is representative of all such things in a group./i)).toBeInTheDocument();
  });*/