// src/domain/events/NotificationCreated.js

import { EventCodes } from "../constants/EventCodes.js";
import { RedisStreams }
from "../../infrastructure/messaging/redis/RedisStreams.js";

export default class NotificationCreated {

  #id;
  #recipient;
  #message;
  #channel;
  #priority;
  #createdAt;

  constructor({
    id,
    recipient,
    message,
    channel,
    priority,
    createdAt,
  }) {

    if (!id) {
      throw new Error("Event must have id");
    }

    if (!recipient) {
      throw new Error("Event must have recipient");
    }

    this.#id = id;
    this.#recipient = recipient;
    this.#message = message;
    this.#channel = channel;
    this.#priority = priority;
    this.#createdAt = createdAt || new Date();
  }

  get stream() {
    return RedisStreams.NOTIFICATION_CREATED;
  }

  toJSON() {
    return {

      eventCode:
        EventCodes.NOTIFICATION_CREATED,

      id: this.#id,

      recipient:
        this.#recipient,

      message:
        this.#message,

      channel:
        this.#channel?.value ??
        this.#channel,

      priority:
        this.#priority?.value ??
        this.#priority,

      createdAt:
        this.#createdAt,

    };
  }

}