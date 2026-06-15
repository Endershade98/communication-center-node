// tests/integration/usecases/CreateNotificationUseCase.integration.test.js

import CreateNotificationUseCase from "../../../src/application/use-cases/CreateNotificationUseCase.js";
import NotificationRepositoryMySQL from "../../../src/infrastructure/repositories/NotificationRepositoryMySQL.js";
import { prismaTest } from "../../setup/prismaTestClient.js";

class FakePublisher {
  constructor() {
    this.events = [];
  }

  async publish(event, payload) {
    this.events.push({ event, payload });
  }
}

afterEach(async () => {
  await prismaTest.notification.deleteMany();
});

describe("CreateNotificationUseCase (integration)", () => {
  test("should persist and emit domain events", async () => {
    const repo = new NotificationRepositoryMySQL(prismaTest);
    const publisher = new FakePublisher();

    const useCase = new CreateNotificationUseCase(repo, publisher);

    const result = await useCase.execute({
      recipient: "test@test.com",
      message: "hello",
      channel: "EMAIL",
      priority: "HIGH",
    });

    expect(result.id).toBeDefined();
    expect(publisher.events.length).toBeGreaterThan(0);
  });
});