// tests/setup/testEnv.js

import { startTestContainers } from "./testContainer.js";

export default async function setupTestEnv() {
  const { mysql, redis } = await startTestContainers();

  const DATABASE_URL =
    `mysql://root:root@${mysql.host}:${mysql.port}/test_db`;

  const REDIS_URL =
    `redis://${redis.host}:${redis.port}`;

  return {
    DATABASE_URL,
    REDIS_URL,
  };
}