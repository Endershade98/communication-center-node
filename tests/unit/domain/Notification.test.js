// tests/unit/domain/Notification.test.js

import Notification from "../../../src/domain/entities/Notification.js";

test("domain event created", () => {
  const n = Notification.create({
    id: "1",
    recipient: "test@test.com",
    message: "hello",
    channel: "EMAIL",
    priority: "HIGH",
  });

  expect(n.domainEvents.length).toBe(1);
});