// src/domain/events/NotificationRetryScheduled.js

import { EventCodes }
from "../constants/EventCodes.js";

import { RedisStreams }
from "../../infrastructure/messaging/redis/RedisStreams.js";

export default class NotificationRetryScheduled {

  #notificationId;
  #occurredAt;

  constructor(notificationId) {

    if (!notificationId) {
      throw new Error(
        "Notification id is required"
      );
    }

    this.#notificationId =
      notificationId;

    this.#occurredAt =
      new Date();
  }

  get stream() {

    return RedisStreams
      .NOTIFICATION_RETRY;

  }

  toJSON() {

    return {
      eventName:
        "notification.retry",

      eventCode:
        EventCodes.NOTIFICATION_RETRY,

      notificationId:
        this.#notificationId,

      occurredAt:
        this.#occurredAt,
    };

  }

}