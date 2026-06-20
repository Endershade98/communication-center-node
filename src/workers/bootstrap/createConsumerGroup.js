// src/workers/bootstrap/createConsumerGroup.js

import Redis from "ioredis";
import { RedisStreams }
from "../../infrastructure/messaging/redis/RedisStreams.js";

const GROUP_NAME =
  "notification-workers";

export async function createConsumerGroup() {

  const redis = new Redis();

  try {

    await redis.xgroup(
      "CREATE",
      RedisStreams.NOTIFICATION_CREATED,
      GROUP_NAME,
      "0",
      "MKSTREAM"
    );

  } catch (err) {

    if (!err.message.includes("BUSYGROUP")) {
      throw err;
    }

  }

  await redis.quit();

}