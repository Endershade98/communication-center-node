// tests/domain/unit/NotificationStatusStateMachine.test.js

import NotificationStatus from "../../../src/domain/value-objects/NotificationStatus.js";

describe("NotificationStatus State Machine", () => {

  test("PENDING -> PROCESSING should be allowed", () => {
    expect(
      NotificationStatus.pending()
        .canTransitionTo(NotificationStatus.processing())
    ).toBe(true);
  });

  test("PROCESSING -> SENT should be allowed", () => {
    expect(
      NotificationStatus.processing()
        .canTransitionTo(NotificationStatus.sent())
    ).toBe(true);
  });

  test("SENT -> PROCESSING should not be allowed", () => {
    expect(
      NotificationStatus.sent()
        .canTransitionTo(NotificationStatus.processing())
    ).toBe(false);
  });

  test("DEAD -> RETRYING should not be allowed", () => {
    expect(
      NotificationStatus.dead()
        .canTransitionTo(NotificationStatus.retrying())
    ).toBe(false);
  });

});