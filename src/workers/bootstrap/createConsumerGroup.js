// src/workers/bootstrap/createConsumerGroup.js

import Redis from "ioredis";

import { StreamNames }
from "../../domain/constants/StreamNames.js";


const GROUP =
  "notification-workers";


export async function createConsumerGroup() {

  const redis =
    new Redis(
      process.env.REDIS_URL
    );

  const streams = [

    StreamNames.NOTIFICATION_CREATED,

    StreamNames.NOTIFICATION_SENT,

    StreamNames.NOTIFICATION_FAILED,

    StreamNames.NOTIFICATION_RETRY,

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

      console.log(
        `[REDIS] consumer group created for ${stream}`
      );

    }
    catch (err) {

      if (
        err.message.includes(
          "BUSYGROUP"
        )
      ) {

        console.log(
          `[REDIS] group already exists for ${stream}`
        );

        continue;
      }

      throw err;
    }

  }

  await redis.quit();

}