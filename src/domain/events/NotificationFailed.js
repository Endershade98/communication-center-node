// src/domain/events/NotificationFailed.js

import { EventCodes }
from "../constants/EventCodes.js";

import { RedisStreams }
from "../../infrastructure/messaging/redis/RedisStreams.js";

export default class NotificationFailed {

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
      .NOTIFICATION_FAILED;

  }

  toJSON() {

    return {
      eventName:
        "notification.failed",

      eventCode:
        EventCodes.NOTIFICATION_FAILED,

      notificationId:
        this.#notificationId,

      occurredAt:
        this.#occurredAt,
    };

  }

}