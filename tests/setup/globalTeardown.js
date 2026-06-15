// tests/setup/globalTeardown.js

import { prismaTest } from "./prismaTestClient.js";
import { stopTestContainers } from "./testContainer.js";

export default async function globalTeardown() {
  await prismaTest.$disconnect();

  await stopTestContainers();

  console.log("🧹 Test teardown completed");
}