import Notification from "../../../src/domain/entities/Notification.js";
import NotificationRepositoryInMemory from "../../../src/infrastructure/repositories/NotificationRepositoryInMemory.js";

describe("NotificationRepositoryInMemory", () => {

  let repo;

  beforeEach(() => {
    repo = new NotificationRepositoryInMemory();
  });

  it("should save a notification", async () => {

    const notification = new Notification({
      id: "1",
      recipient: "user@test.com",
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH"
    });

    await repo.save(notification);

    const found = await repo.findById("1");

    expect(found).not.toBeNull();
    expect(found.id).toBe("1");

  });

  it("should update a notification", async () => {

    const notification = new Notification({
      id: "1",
      recipient: "user@test.com",
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH"
    });

    await repo.save(notification);

    const updated = notification.markAsSent();

    await repo.update(updated);

    const found = await repo.findById("1");

    expect(found.status.value).toBe("SENT");

  });

});