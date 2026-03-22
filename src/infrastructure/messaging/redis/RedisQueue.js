// src/infrastructure/messaging/redis/RedisQueue.js
import { createClient } from "redis";

export default class RedisPublisher {
  constructor() {
    // Crea il client Redis
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
    });

    this.client.on("error", (err) => console.error("Redis Client Error", err));
    this.client.connect().then(() => {
      console.log("✅ Redis connected");
    });
  }

  async publish(topic, payload) {
    if (!topic || !payload) {
      throw new Error("RedisPublisher.publish requires topic and payload");
    }
    const message = JSON.stringify(payload);
    await this.client.publish(topic, message);
    console.log(`📤 Published to ${topic}:`, message);
  }
}