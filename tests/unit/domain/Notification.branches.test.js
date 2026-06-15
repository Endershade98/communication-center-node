// tests/unit/domain/Notification.branches.test.js

import Notification from "../../../src/domain/entities/Notification.js";

describe("Notification branch coverage", () => {

  test("markAsFailed adds event", () => {
    const n = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    const failed = n
      .markAsProcessing()
      .markAsFailed();

    expect(failed.status.value).toBe("FAILED");
    expect(failed.domainEvents.length).toBe(1);
  });

  test("markAsDead works", () => {
    const n = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    const dead = n
      .markAsProcessing()
      .markAsFailed()
      .markAsDead();

    expect(dead.status.value).toBe("DEAD");
  });

  test("retry transitions correctly", () => {
    const n = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    const retried = n
      .markAsProcessing()
      .markAsFailed()
      .retry();

    expect(retried.status.value).toBe("RETRYING");
  });

});