// src/domain/events/NotificationSent.js

import { EventCodes }
from "../constants/EventCodes.js";

import { RedisStreams }
from "../../infrastructure/messaging/redis/RedisStreams.js";

export default class NotificationSent {

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
      .NOTIFICATION_SENT;

  }

  toJSON() {

    return {
      eventName:
        "notification.sent",

      eventCode:
        EventCodes.NOTIFICATION_SENT,

      notificationId:
        this.#notificationId,

      occurredAt:
        this.#occurredAt,
    };

  }

}