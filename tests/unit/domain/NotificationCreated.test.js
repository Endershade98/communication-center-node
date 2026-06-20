// tests/unit/domain/NotificationCreated.test.js

import NotificationCreated
  from "../../../src/domain/events/NotificationCreated.js";

describe(
  "NotificationCreated",
  () => {

    test(
      "contains stream name",
      () => {

        const event =
          new NotificationCreated({
            id: "1",
            recipient: "a@test.com",
            message: "hello",
            channel: "EMAIL",
            priority: "HIGH",
          });

        expect(
          event.stream,
        ).toBe(
          "notifications:created",
        );

      },
    );

    test(
      "toJSON returns payload",
      () => {

        const event =
          new NotificationCreated({
            id: "1",
            recipient: "a@test.com",
            message: "hello",
            channel: "EMAIL",
            priority: "HIGH",
          });

        const json =
          event.toJSON();

        expect(
          json.eventCode,
        ).toBeDefined();

        expect(
          json.id,
        ).toBe("1");

        expect(
          json.recipient,
        ).toBe(
          "a@test.com",
        );

      },
    );

  },
);