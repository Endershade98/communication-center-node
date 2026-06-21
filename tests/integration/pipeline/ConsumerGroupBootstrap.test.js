// tests/integration/pipeline/ConsumerGroupBootstrap.test.js

import Redis from "ioredis";

describe(
  "Consumer Group Bootstrap",
  () => {

    test(
      "creates consumer group",
      async () => {

        const redis =
          new Redis(
            process.env.REDIS_URL,
          );

        try {

          await redis.xgroup(
            "CREATE",
            "notifications:created",
            "notification-workers",
            "0",
            "MKSTREAM",
          );

        } catch {}

        const groups =
          await redis.xinfo(
            "GROUPS",
            "notifications:created",
          );

        expect(
          groups.length,
        ).toBeGreaterThan(0);

        await redis.quit();

      },
    );

  },
);