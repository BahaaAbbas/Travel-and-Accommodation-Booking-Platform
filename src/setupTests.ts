import "@testing-library/jest-dom";
import { server } from "./tests/mocks/server";

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test (for overrides)
afterEach(() => server.resetHandlers());

// Close server when tests are done
afterAll(() => server.close());
