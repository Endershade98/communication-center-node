// tests/setup/globalSetup.js

import { execSync } from "child_process";
import setupTestEnv from "./testEnv.js";

export default async function globalSetup() {
  console.log("🧪 Starting test containers...");

  const env = await setupTestEnv();

  process.env.DATABASE_URL = env.DATABASE_URL;
  process.env.REDIS_URL = env.REDIS_URL;
  process.env.NODE_ENV = "test";

  console.log("🧪 Running Prisma migrations on test DB...");

  execSync("npx prisma db push --accept-data-loss", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: env.DATABASE_URL,
    },
  });
}