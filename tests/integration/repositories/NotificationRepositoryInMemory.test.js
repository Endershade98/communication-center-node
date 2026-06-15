// tests/integration/repositories/NotificationRepositoryInMemory.test.js

import NotificationRepositoryInMemory
  from "../../../src/infrastructure/repositories/NotificationRepositoryInMemory.js";

import Notification
  from "../../../src/domain/entities/Notification.js";

describe("InMemory Repository", () => {

  test("save + findById", async () => {
    const repo = new NotificationRepositoryInMemory();

    const n = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    await repo.save(n);

    const found = await repo.findById("1");

    expect(found.id).toBe("1");
  });

  test("update throws if not found", async () => {
    const repo = new NotificationRepositoryInMemory();

    await expect(
      repo.update(Notification.create({
        id: "999",
        recipient: "x",
        message: "x",
        channel: "EMAIL",
        priority: "LOW",
      }))
    ).rejects.toThrow();
  });

});