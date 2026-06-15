// src/domain/events/NotificationFailed.js

import { EventCodes } from "../constants/EventCodes.js";

export default class NotificationFailed {

  #notificationId;
  #occurredAt;

  constructor(notificationId) {
    if (!notificationId) {
      throw new Error("Notification id is required");
    }

    this.#notificationId = notificationId;
    this.#occurredAt = new Date();

    // Object.freeze(this);
  }

  get notificationId() {
    return this.#notificationId;
  }

  get occurredAt() {
    return this.#occurredAt;
  }

  toJSON() {
    return {
      eventName: "notification.failed",
      eventCode: EventCodes.NOTIFICATION_FAILED,

      notificationId: this.#notificationId,
      occurredAt: this.#occurredAt,
    };
  }
}