// tests/integration/repositories/NotificationRepositoryMySQL.test.js

import NotificationRepositoryMySQL
  from "../../../src/infrastructure/repositories/NotificationRepositoryMySQL.js";

import Notification
  from "../../../src/domain/entities/Notification.js";

import { prismaTest }
  from "../../setup/prismaTestClient.js";

import { truncateAll }
  from "../../setup/dbCleanup.js";

describe("MySQL Repository", () => {

  afterEach(async () => {
    await truncateAll(prismaTest);
  });

  test("save + findById", async () => {

    const repo =
      new NotificationRepositoryMySQL(prismaTest);

    const notification =
      Notification.create({
        id: "1",
        recipient: "a@a.com",
        message: "hello",
        channel: "EMAIL",
        priority: "LOW",
      });

    await repo.save(notification);

    const found =
      await repo.findById("1");

    expect(found).not.toBeNull();

    expect(found.id)
      .toBe("1");

    expect(found.recipient)
      .toBe("a@a.com");

    expect(found.message)
      .toBe("hello");

    expect(found.channel.value)
      .toBe("EMAIL");

    expect(found.priority.value)
      .toBe("LOW");

    expect(found.status.value)
      .toBe("PENDING");
  });

  test("findByRecipient", async () => {

    const repo =
      new NotificationRepositoryMySQL(prismaTest);

    await repo.save(
      Notification.create({
        id: "1",
        recipient: "test@test.com",
        message: "msg1",
        channel: "EMAIL",
        priority: "LOW",
      }),
    );

    await repo.save(
      Notification.create({
        id: "2",
        recipient: "test@test.com",
        message: "msg2",
        channel: "SMS",
        priority: "HIGH",
      }),
    );

    const result =
      await repo.findByRecipient(
        "test@test.com",
      );

    expect(result)
      .toHaveLength(2);
  });

});