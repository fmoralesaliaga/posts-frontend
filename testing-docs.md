# Posts Frontend - Testing Documentation

This document outlines the testing strategy and implementation for the Posts Frontend project.

## Testing Tools

- **Vitest**: Main test runner and framework
- **React Testing Library**: For component testing
- **MSW (Mock Service Worker)**: For mocking API requests
- **@testing-library/user-event**: For simulating user interactions
- **jsdom**: For providing a mock DOM environment

## Types of Tests

### Unit Tests

- **Reducer/Slice Tests**: Testing Redux state management
- **Service Tests**: Testing API service functions
- **Utility Tests**: Testing utility functions

### Component Tests

- **UI Component Tests**: Testing UI rendering and interactions
- **Integration Tests**: Testing component interaction with Redux

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Test Structure

Tests are organized in `__tests__` folders adjacent to the files they test:

```
src/
  components/
    posts/
      __tests__/         # Component tests
  features/
    posts/
      __tests__/         # Feature tests including Redux slices
  services/
    __tests__/          # API service tests
```

## Mocking Strategies

1. **API Mocks**: Using MSW to intercept and mock API calls
2. **Redux Mocks**: Mock store setup for testing components with Redux
3. **Component Mocks**: For complex child components in unit tests

## Continuous Integration

Tests are automatically run on every push and pull request via GitHub Actions.

## Coverage Goals

- **Statements**: 70%
- **Branches**: 70% 
- **Functions**: 70%
- **Lines**: 70%
