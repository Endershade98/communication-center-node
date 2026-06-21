// tests/unit/application/DomainEventDispatcher.test.js

import DomainEventDispatcher
  from "../../../src/application/services/DomainEventDispatcher.js";

class FakePublisher {

  constructor() {
    this.calls = [];
  }

  async publish(stream, payload) {

    this.calls.push({
      stream,
      payload,
    });

  }

}

describe(
  "DomainEventDispatcher",
  () => {

    test(
      "dispatch publishes to stream",
      async () => {

        const publisher =
          new FakePublisher();

        const dispatcher =
          new DomainEventDispatcher(
            publisher,
          );

        const fakeEvent = {

          stream:
            "notifications:created",

          toJSON() {

            return {
              id: "123",
            };

          },

        };

        await dispatcher.dispatch([
          fakeEvent,
        ]);

        expect(
          publisher.calls,
        ).toHaveLength(1);

        expect(
          publisher.calls[0].stream,
        ).toBe(
          "notifications:created",
        );

        expect(
          publisher.calls[0].payload,
        ).toEqual({
          id: "123",
        });

      },
    );

  },
);