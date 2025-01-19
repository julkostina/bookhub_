import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

// Reset mocks before each test
beforeEach(() => {
  fetchMock.resetMocks();
});