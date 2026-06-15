// tests/unit/domain/NotificationStatus.extra.test.js

import NotificationStatus from "../../../src/domain/value-objects/NotificationStatus.js";

describe("NotificationStatus extra coverage", () => {

  test("equals works correctly", () => {
    expect(
      NotificationStatus.pending().equals(NotificationStatus.pending())
    ).toBe(true);
  });

  test("invalid constructor throws", () => {
    expect(() => new NotificationStatus("INVALID")).toThrow();
  });

  test("static canTransition works", () => {
    expect(
      NotificationStatus.canTransition("PENDING", "PROCESSING")
    ).toBe(true);

    expect(
      NotificationStatus.canTransition("SENT", "PROCESSING")
    ).toBe(false);
  });

});