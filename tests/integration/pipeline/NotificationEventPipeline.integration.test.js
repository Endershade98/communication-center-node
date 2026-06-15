// tests/integration/pipeline/NotificationEventPipeline.integration.test.js

import Redis from "ioredis";

describe("Event Pipeline (Redis)", () => {
  test("publish + consume event", async () => {
    const subscriber = new Redis(process.env.REDIS_URL);
    const publisher = new Redis(process.env.REDIS_URL);

    const received = [];

    await subscriber.subscribe("notification.created");

    subscriber.on("message", (channel, message) => {
      received.push({
        channel,
        payload: JSON.parse(message),
      });
    });

    await publisher.publish(
      "notification.created",
      JSON.stringify({
        id: "1",
      }),
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 300),
    );

    expect(received.length).toBe(1);
    expect(received[0].payload.id).toBe("1");

    await subscriber.quit();
    await publisher.quit();
  });
});