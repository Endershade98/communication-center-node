// tests/setup/transaction.js

import { prismaTest } from "./prismaTestClient.js";

export async function runInTransaction(fn) {
  return prismaTest.$transaction(async (tx) => {
    const result = await fn(tx);
    throw new Error("__ROLLBACK__"); // forza rollback
    return result;
  }).catch((e) => {
    if (e.message !== "__ROLLBACK__") throw e;
  });
}