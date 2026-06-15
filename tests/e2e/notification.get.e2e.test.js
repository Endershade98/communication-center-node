// tests/e2e/notification.get.e2e.test.js

import request from "supertest";
import { createServer } from "../../src/server.js";

describe("GET /notifications/:id", () => {
  test("should return a notification", async () => {
    const { app } = createServer();

    const created = await request(app)
      .post("/notifications")
      .send({
        recipient: "get@test.com",
        message: "hello",
        channel: "EMAIL",
        priority: "HIGH",
      });

    const id = created.body.id;

    const res = await request(app)
      .get(`/notifications/${id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.recipient).toBe("get@test.com");
  });

  test("should return 404 if not found", async () => {
    const { app } = createServer();

    const res = await request(app)
      .get("/notifications/invalid-id");

    expect(res.status).toBe(404);
  });
});