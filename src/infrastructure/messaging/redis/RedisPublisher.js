// src/infrastructure/messaging/redis/RedisPublisher.js

import Redis from "ioredis";

export default class RedisPublisher {

  constructor({ host = "127.0.0.1", port = 6379 } = {}) {
    this.redis = new Redis({ host, port });
  }

  async publish(channel, message) {
    const payload =
      typeof message === "string"
        ? message
        : JSON.stringify(message);

    await this.redis.publish(channel, payload);
  }

  async disconnect() {
    await this.redis.quit();
  }
}