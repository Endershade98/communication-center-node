// src/domain/events/NotificationCreated.js

import { EventCodes } from "../constants/EventCodes.js";

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

    Object.freeze(this);
  }

  get id() {
    return this.#id;
  }

  get recipient() {
    return this.#recipient;
  }

  get message() {
    return this.#message;
  }

  get channel() {
    return this.#channel;
  }

  get priority() {
    return this.#priority;
  }

  get createdAt() {
    return this.#createdAt;
  }

  toJSON() {
    return {
      eventName: "notification.created",
      eventCode: EventCodes.NOTIFICATION_CREATED,

      id: this.#id,
      recipient: this.#recipient,
      message: this.#message,

      channel:
        this.#channel?.value ||
        this.#channel,

      priority:
        this.#priority?.value ||
        this.#priority,

      createdAt: this.#createdAt,
    };
  }
}