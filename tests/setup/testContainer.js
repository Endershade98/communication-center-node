// tests/setup/testContainer.js

import { GenericContainer } from "testcontainers";

let mysqlContainer;
let redisContainer;

export async function startTestContainers() {
  mysqlContainer = await new GenericContainer("mysql:8.0")
    .withEnvironment({
      MYSQL_ROOT_PASSWORD: "root",
      MYSQL_DATABASE: "test_db",
    })
    .withExposedPorts(3306)
    .start();

  redisContainer = await new GenericContainer("redis:7")
    .withExposedPorts(6379)
    .start();

  return {
    mysql: {
      host: mysqlContainer.getHost(),
      port: mysqlContainer.getMappedPort(3306),
    },
    redis: {
      host: redisContainer.getHost(),
      port: redisContainer.getMappedPort(6379),
    },
  };
}

export async function stopTestContainers() {
  await mysqlContainer?.stop();
  await redisContainer?.stop();
}