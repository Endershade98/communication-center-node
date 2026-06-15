// tests/unit/infrastructure/NotificationMapper.test.js

import NotificationMapper from "../../../src/infrastructure/mappers/NotificationMapper.js";
import Notification from "../../../src/domain/entities/Notification.js";

describe("NotificationMapper", () => {

  test("toPersistence converts correctly", () => {
    const n = Notification.create({
      id: "1",
      recipient: "a@a.com",
      message: "hello",
      channel: "EMAIL",
      priority: "LOW",
    });

    const data = NotificationMapper.toPersistence(n);

    expect(data.id).toBe("1");
    expect(data.channel).toBe("EMAIL");
    expect(data.priority).toBe("LOW");
    expect(data.status).toBe("PENDING");
  });

  test("toDomainList handles empty input", () => {
    expect(NotificationMapper.toDomainList(null)).toEqual([]);
  });

});