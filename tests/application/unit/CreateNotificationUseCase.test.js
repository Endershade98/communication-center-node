import CreateNotificationUseCase from "../../../src/application/use-cases/CreateNotificationUseCase.js";
import NotificationRepositoryInMemory from "../../../src/infrastructure/repositories/NotificationRepositoryInMemory.js";

describe("CreateNotificationUseCase", () => {

  it("should create and store a notification and publish event", async () => {

    const repo = new NotificationRepositoryInMemory();
    
    const fakePublisher = {
      events: [],
      async publish(topic, payload) {
        this.events.push({ topic, payload });
      }
    };

    const useCase = new CreateNotificationUseCase(
      repo,
      fakePublisher
    );

    const data = {
      recipient: "user@test.com",
      message: "Hello",
      channel: "EMAIL",
      priority: "HIGH"
    };

    const result = await useCase.execute(data);

    // ✅ verify saved (usa ID generato)
    const saved = await repo.findById(result.id);
    expect(saved).not.toBeNull();

    // ✅ verify event
    expect(fakePublisher.events.length).toBe(1);
    expect(fakePublisher.events[0].topic).toBe("notification.created");

    // ✅ verify payload evento (molto importante)
    expect(fakePublisher.events[0].payload.id).toBe(result.id);

    // ✅ verify return
    expect(result.id).toBeDefined();
    expect(result.message).toBe("Hello");

  });

});