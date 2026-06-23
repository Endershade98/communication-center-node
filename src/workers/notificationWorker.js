// src/workers/notificationWorker.js

import Redis from "ioredis";

import {
  prisma
}
from "../infrastructure/database/prismaClient.js";

import NotificationRepositoryMySQL
from "../infrastructure/repositories/NotificationRepositoryMySQL.js";

import NotificationProviderFactory
from "../infrastructure/providers/NotificationProviderFactory.js";

import ProcessNotificationUseCase
from "../application/use-cases/ProcessNotificationUseCase.js";

import NotificationWorker
from "./NotificationWorker.js";

import {
  createConsumerGroup
}
from "./bootstrap/createConsumerGroup.js";


const GROUP =
  "notification-workers";

const CONSUMER =
  `worker-${process.pid}`;


async function bootstrap() {

  await createConsumerGroup();

  const redis =
    new Redis(
      process.env.REDIS_URL
    );

  const repository =
    new NotificationRepositoryMySQL(
      prisma
    );

  const providerFactory =
    new NotificationProviderFactory({

      emailApiKey:
        process.env.EMAIL_API_KEY,

      emailFrom:
        process.env.EMAIL_FROM,

      smsApiKey:
        process.env.SMS_API_KEY,

      pushKey:
        process.env.PUSH_KEY,

    });

  const publisher = {

    async publish(
      stream,
      payload
    ) {

      await redis.xadd(
        stream,
        "*",
        "data",
        JSON.stringify(payload)
      );

    }

  };

  const processUseCase =
    new ProcessNotificationUseCase(

      repository,

      providerFactory,

      publisher,

    );

  const worker =
    new NotificationWorker({

      redis,

      group: GROUP,

      consumer: CONSUMER,

      processNotificationUseCase:
        processUseCase,

    });

  await worker.start();

}

bootstrap().catch(err => {

  console.error(
    "[WORKER BOOT ERROR]",
    err
  );

  process.exit(1);

});