// src/infrastructure/messaging/redis/RedisPublisher.js
import Redis from "ioredis";
import { config } from "dotenv";

config(); // legge .env o .env.test se NODE_ENV=test

export default class RedisPublisher {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: parseInt(process.env.REDIS_PORT) || 6379,
    });
  }

  async publish(channel, message) {
    if (!channel || !message) throw new Error("Channel and message are required");
    const payload = typeof message === "string" ? message : JSON.stringify(message);
    try {      await this.redis.publish(channel, payload);
    } catch (error) {
      console.error("Error publishing to Redis:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.redis.quit();
    } catch (error) {
      console.error("Error disconnecting from Redis:", error);
    }
  }
}