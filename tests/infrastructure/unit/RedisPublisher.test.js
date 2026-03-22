// tests/infrastructure/unit/RedisPublisher.test.js
import RedisPublisher from "../../../src/infrastructure/messaging/redis/RedisPublisher.js";

describe("RedisPublisher", () => {
  let publisher;

  beforeAll(() => {
    publisher = new RedisPublisher();
  });

  afterAll(async () => {
    await publisher.disconnect();
  });

  test("should publish a message", async () => {
    await expect(
      publisher.publish("test-channel", { msg: "hello" })
    ).resolves.not.toThrow();
  });
});