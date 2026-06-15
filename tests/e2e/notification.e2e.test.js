// tests/e2e/notification.e2e.test.js

import request from "supertest";
import { createServer } from "../../src/server.js";

describe("E2E Notification", () => {
  test("POST /notifications", async () => {
    const { app } = createServer();

    const res = await request(app)
      .post("/notifications")
      .send({
        recipient: "e2e@test.com",
        message: "hello",
        channel: "EMAIL",
        priority: "HIGH",
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});