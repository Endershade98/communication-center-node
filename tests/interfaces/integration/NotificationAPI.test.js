import request from "supertest";
import createApp from "../../../src/app.js";

class FakeRepo {
  async save(notification) {
    return notification;
  }
}

class FakePublisher {
  async publish() {}
}

const app = createApp({
  repo: new FakeRepo(),
  publisher: new FakePublisher(),
});

describe("POST /notifications", () => {
  it("should create notification", async () => {
    const res = await request(app).post("/notifications").send({
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH",
      recipient: "test@test.com",
    });

    expect(res.status).toBe(201);
  });
});