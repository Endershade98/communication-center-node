// tests/unit/application/DomainEventDispatcher.test.js

import DomainEventDispatcher from "../../../src/application/services/DomainEventDispatcher.js";

class FakePublisher {
  constructor() {
    this.calls = [];
  }

  async publish(event, payload) {
    this.calls.push({ event, payload });
  }
}

test("dispatch sends events", async () => {
  const publisher = new FakePublisher();
  const dispatcher = new DomainEventDispatcher(publisher);

  const fakeEvent = {
    toJSON: () => ({
      eventName: "test.event",
      value: 123
    })
  };

  await dispatcher.dispatch([fakeEvent]);

  expect(publisher.calls.length).toBe(1);
  expect(publisher.calls[0].event).toBe("test.event");
});