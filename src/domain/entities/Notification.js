// src/domain/entities/Notification.js
import NotificationStatus from "../value-objects/NotificationStatus.js";
import Channel from "../value-objects/Channel.js";
import Priority from "../value-objects/Priority.js";

export default class Notification {

  #id;
  #recipient;
  #message;
  #channel;
  #priority;
  #status;
  #createdAt;
  #sentAt;
  #failedAt;

  constructor({ id, recipient, message, channel, priority, status, createdAt, sentAt, failedAt }) {
    if (!id) throw new Error("Notification id is required");
    if (!recipient) throw new Error("Recipient is required");
    if (!message) throw new Error("Message is required");

    this.#id = id;
    this.#recipient = recipient;
    this.#message = message;

    this.#channel = channel instanceof Channel ? channel : new Channel(channel);
    this.#priority = priority instanceof Priority ? priority : new Priority(priority);
    this.#status = status instanceof NotificationStatus ? status : NotificationStatus.pending();

    this.#createdAt = createdAt || new Date();
    this.#sentAt = sentAt || null;
    this.#failedAt = failedAt || null;

    Object.freeze(this); // rende l'oggetto immutabile
  }

  // Getters
  get id() { return this.#id; }
  get recipient() { return this.#recipient; }
  get message() { return this.#message; }
  get channel() { return this.#channel; }
  get priority() { return this.#priority; }
  get status() { return this.#status; }
  get createdAt() { return this.#createdAt; }
  get sentAt() { return this.#sentAt; }
  get failedAt() { return this.#failedAt; }

  // Domain behaviors

  markAsSent() {
    if (this.#status.equals(NotificationStatus.sent())) {
      throw new Error("Notification already sent");
    }

    return new Notification({
      id: this.#id,
      recipient: this.#recipient,
      message: this.#message,
      channel: this.#channel,
      priority: this.#priority,
      status: NotificationStatus.sent(),
      createdAt: this.#createdAt,
      sentAt: new Date(),
      failedAt: this.#failedAt
    });
  }

  markAsFailed() {
    if (this.#status.equals(NotificationStatus.failed())) {
      throw new Error("Notification already failed");
    }

    return new Notification({
      id: this.#id,
      recipient: this.#recipient,
      message: this.#message,
      channel: this.#channel,
      priority: this.#priority,
      status: NotificationStatus.failed(),
      createdAt: this.#createdAt,
      sentAt: this.#sentAt,
      failedAt: new Date()
    });
  }

  retry() {
    if (!this.#status.equals(NotificationStatus.failed())) {
      throw new Error("Only failed notifications can be retried");
    }

    return new Notification({
      id: this.#id,
      recipient: this.#recipient,
      message: this.#message,
      channel: this.#channel,
      priority: this.#priority,
      status: NotificationStatus.retrying(),
      createdAt: this.#createdAt,
      sentAt: this.#sentAt,
      failedAt: this.#failedAt
    });
  }

  // Comparazione tra notifiche (Value Object-style)
  equals(other) {
    if (!(other instanceof Notification)) return false;
    return this.#id === other.id;
  }

}