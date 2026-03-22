import Notification from "../../../src/domain/entities/Notification.js";

describe("Notification Entity", () => {

  it("should create a valid notification", () => {

    const notification = new Notification({
      id: "1",
      recipient: "user@test.com",
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH"
    });

    expect(notification.id).toBe("1");
    expect(notification.recipient).toBe("user@test.com");
    expect(notification.status.value).toBe("PENDING");

  });

  it("should mark notification as sent", () => {

    const notification = new Notification({
      id: "1",
      recipient: "user@test.com",
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH"
    });

    const sent = notification.markAsSent();

    expect(sent.status.value).toBe("SENT");
    expect(sent.sentAt).not.toBeNull();

  });

  it("should mark notification as failed", () => {

    const notification = new Notification({
      id: "1",
      recipient: "user@test.com",
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH"
    });

    const failed = notification.markAsFailed();

    expect(failed.status.value).toBe("FAILED");
    expect(failed.failedAt).not.toBeNull();

  });

  it("should retry only failed notifications", () => {

    const notification = new Notification({
      id: "1",
      recipient: "user@test.com",
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH"
    });

    const failed = notification.markAsFailed();
    const retried = failed.retry();

    expect(retried.status.value).toBe("RETRYING");

  });

});