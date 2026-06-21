// tests/integration/usecases/CreateNotificationUseCase.integration.test.js

import CreateNotificationUseCase from "../../../src/application/use-cases/CreateNotificationUseCase.js";
import NotificationRepositoryMySQL from "../../../src/infrastructure/repositories/NotificationRepositoryMySQL.js";
import { prismaTest } from "../../setup/prismaTestClient.js";

class FakePublisher {

  constructor() {
    this.events = [];
  }

  async publish(stream, payload) {

    this.events.push({
      stream,
      payload,
    });

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

    expect(
      publisher.events[0].stream,
    ).toBe(
      "notifications:created",
    );
    
    expect(
      publisher.events[0].payload.id,
    ).toBeDefined();
  });
});