export default {
  testEnvironment: "node",

  testMatch: ["**/tests/**/*.test.js"],

  setupFiles: ["<rootDir>/tests/setup/jest.setup.cjs"],

  globalSetup: "<rootDir>/tests/setup/globalSetup.js",
  globalTeardown: "<rootDir>/tests/setup/globalTeardown.js",

  maxWorkers: 1,

  clearMocks: true,
  restoreMocks: true
};