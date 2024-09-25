import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

// Setup the mock server using the defined handlers
export const server = setupServer(...handlers);
