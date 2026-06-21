// tests/unit/infrastructure/RedisStreamPublisher.test.js

import RedisStreamPublisher
from "../../../src/infrastructure/messaging/redis/RedisStreamPublisher.js";

describe("RedisStreamPublisher", () => {

  test("disabled mode skips publish", async () => {

    const publisher =
      new RedisStreamPublisher({
        disabled: true,
      });

    await expect(
      publisher.publish(
        "notifications:created",
        { id: "1" },
      ),
    ).resolves.toBeUndefined();

  });

});