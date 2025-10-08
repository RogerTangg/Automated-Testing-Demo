/**
 * Jest Setup File
 * Global setup for Jest testing environment
 */

// Global test timeout
jest.setTimeout(10000);

// Console override for cleaner test output
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Suppress console.error during tests unless it's a test failure
  console.error = (...args) => {
    if (args[0] && args[0].includes && args[0].includes('Warning:')) {
      return;
    }
    originalConsoleError(...args);
  };

  // Suppress console.warn during tests
  console.warn = (...args) => {
    if (args[0] && args[0].includes && args[0].includes('Warning:')) {
      return;
    }
    originalConsoleWarn(...args);
  };
});

afterAll(() => {
  // Restore original console methods
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Global test helpers
global.testHelpers = {
  // Helper to create test user data
  createTestUser: (overrides = {}) => ({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    ...overrides
  }),

  // Helper to create calculator test data
  createCalculatorTestData: () => ({
    validNumbers: [1, 2, 5, 10, -5, 0.5, 100.25],
    invalidInputs: ['string', null, undefined, {}, [], NaN]
  }),

  // Helper for async test delays
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms))
};