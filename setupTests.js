import '@testing-library/jest-dom/vitest'
import { setupServer } from 'msw/node';
import { handlers } from './src/mocks/handlers';
import { afterEach, beforeAll, afterAll } from 'vitest';
const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test to ensure clean state
afterEach(() => server.resetHandlers());

// Close the server after all tests are done
afterAll(() => server.close());







