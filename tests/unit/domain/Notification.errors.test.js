// tests/unit/domain/Notification.errors.test.js

import Notification from "../../../src/domain/entities/Notification.js";

describe("Notification errors", () => {

  test("missing id throws", () => {
    expect(() => new Notification({
      recipient: "a",
      message: "b",
      channel: "EMAIL",
      priority: "LOW"
    })).toThrow();
  });

  test("invalid transition throws", () => {
    const n = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    expect(() => n.markAsSent()).toThrow(); // PENDING -> SENT non valido
  });

});