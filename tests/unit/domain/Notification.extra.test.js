// tests/unit/domain/Notification.extra.test.js

import Notification from "../../../src/domain/entities/Notification.js";

describe("Notification extra", () => {

  test("equals true for same id", () => {
    const a = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    const b = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    expect(a.equals(b)).toBe(true);
  });

  test("markAsSent emits event", () => {
    const n = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    const sent = n.markAsProcessing().markAsSent();

    expect(sent.status.value).toBe("SENT");
    expect(sent.domainEvents.length).toBe(1);
  });

});