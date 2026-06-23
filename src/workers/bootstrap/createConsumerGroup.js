// src/workers/bootstrap/createConsumerGroup.js

import Redis from "ioredis";

import { RedisStreams }
from "../../infrastructure/messaging/redis/RedisStreams.js";

const GROUP =
  "notification-workers";

export async function createConsumerGroup() {

  const redis =
    new Redis(
      process.env.REDIS_URL,
    );

  const streams = [

    RedisStreams.NOTIFICATION_CREATED,

    RedisStreams.NOTIFICATION_SENT,

    RedisStreams.NOTIFICATION_FAILED,

    RedisStreams.NOTIFICATION_RETRY,

  ];

  for (const stream of streams) {

    try {

      await redis.xgroup(
        "CREATE",
        stream,
        GROUP,
        "0",
        "MKSTREAM",
      );

    } catch (err) {

      if (
        !err.message.includes(
          "BUSYGROUP",
        )
      ) {
        throw err;
      }

    }

  }

  await redis.quit();

}