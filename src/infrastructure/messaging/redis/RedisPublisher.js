// src/infrastructure/messaging/redis/RedisPublisher.js

import Redis from "ioredis";

export default class RedisPublisher {
  constructor({
    host = "127.0.0.1",
    port = 6379,
    redisClient,
    disabled = process.env.NODE_ENV === "test",
  } = {}) {
    this.disabled = disabled;

    if (this.disabled) return;

    this.redis = redisClient ?? new Redis({ host, port });
  }

  async publish(channel, message) {
    if (this.disabled) return;

    const payload =
      typeof message === "string"
        ? message
        : JSON.stringify(message);

    await this.redis.publish(channel, payload);
  }

  async disconnect() {
    if (this.disabled) return;
    await this.redis.quit();
  }
}