// tests/integration/pipeline/NotificationStream.integration.test.js

import Redis from "ioredis";

describe(
  "Redis Stream",
  () => {

    test(
      "writes event into stream",
      async () => {

        const redis =
          new Redis(
            process.env.REDIS_URL,
          );

        await redis.xadd(
          "notifications:created",
          "*",
          "id",
          "1",
        );

        const result =
          await redis.xrange(
            "notifications:created",
            "-",
            "+",
          );

        expect(
          result.length,
        ).toBeGreaterThan(0);

        await redis.quit();

      },
    );

  },
);