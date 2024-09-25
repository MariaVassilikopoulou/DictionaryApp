import { http, HttpResponse } from 'msw';

// Define API request handlers for mocking responses
export const handlers = [
  // Mock the GET request to the dictionary API with a specific word
  http.get('https://api.dictionaryapi.dev/api/v2/entries/en/:word', (req, res, ctx) => {
    const { word } = req.params;
    console.log('RECEIVED THE WORD:', word);
    
    // Return error if no word is provided in the request
    if (!word) {
      return res(ctx.status(400), ctx.json({ message: "Word is missing" }));
    }

    // Mock a response for the word 'example' 
    if (word === 'example') {
      const responseData = [
        {
          word: "example",
          phonetic: "/əɡˈzæmpl̩/",
          phonetics: [
            {
              text: "/əɡˈzæmpl̩/",
              audio: "https://api.dictionaryapi.dev/media/pronunciations/en/example-us.mp3"
            }
          ],
          meanings: [
            {
              partOfSpeech: "noun",
              definitions: [
                {
                  definition: "Something that is representative of all such things in a group."
                }
              ]
            }
          ],
          license: {
            name: 'CC BY-SA 3.0',
            url: 'https://creativecommons.org/licenses/by-sa/3.0'
          },
          sourceUrls: ['https://en.wiktionary.org/wiki/example']
        }
      ];

      console.log('Mocked response:', responseData);
      // Return a successful response with mock data
      return HttpResponse.json(responseData);
    } else {
      // Return a 404 response if the word is not found
      return res(ctx.status(404), ctx.json({ message: "Word not found" }));
    }
  }),
];
