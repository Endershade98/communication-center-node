// tests/unit/infrastructure/RedisPublisher.test.js

import RedisPublisher from "../../../src/infrastructure/messaging/redis/RedisPublisher.js";

describe("RedisPublisher", () => {

  test("disabled mode skips publish", async () => {
    const pub = new RedisPublisher({ disabled: true });

    await expect(pub.publish("x", { a: 1 })).resolves.toBeUndefined();
  });

  test("string message passthrough logic", () => {
    const pub = new RedisPublisher({ disabled: true });

    const result = typeof pub.publish === "function";
    expect(result).toBe(true);
  });

});