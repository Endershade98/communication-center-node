// src/infrastructure/messaging/redis/RedisStreamPublisher.js

import Redis from "ioredis";

export default class RedisStreamPublisher {

  constructor({
    host = "127.0.0.1",
    port = 6379,
    redisClient,
    disabled = process.env.NODE_ENV === "test",
  } = {}) {

    this.disabled = disabled;

    if (this.disabled) return;

    this.redis =
      redisClient ??
      new Redis({
        host,
        port,
      });
  }

  async publish(stream, payload) {

    if (this.disabled) return;

    await this.redis.xadd(
      stream,
      "*",
      "data",
      JSON.stringify(payload)
    );
  }

  async disconnect() {

    if (this.disabled) return;

    await this.redis.quit();
  }

}