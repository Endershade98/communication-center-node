// tests/setup/jest.setup.cjs

require("dotenv").config({
  path: ".env.test",
  quiet: true,
});

process.env.NODE_ENV = "test";