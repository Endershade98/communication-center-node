// tests/unit/domain/NotificationStatus.test.js

import NotificationStatus from "../../../src/domain/value-objects/NotificationStatus.js";

describe("NotificationStatus", () => {
  test("valid transition PENDING → PROCESSING", () => {
    const status = NotificationStatus.pending();
    expect(status.canTransitionTo(NotificationStatus.processing())).toBe(true);
  });

  test("invalid transition SENT → PROCESSING", () => {
    const status = NotificationStatus.sent();
    expect(status.canTransitionTo(NotificationStatus.processing())).toBe(false);
  });
});