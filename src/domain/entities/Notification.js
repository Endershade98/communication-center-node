// src/domain/entities/Notification.js

import NotificationStatus from "../value-objects/NotificationStatus.js";
import Channel from "../value-objects/Channel.js";
import Priority from "../value-objects/Priority.js";

import NotificationCreated from "../events/NotificationCreated.js";
import NotificationSent from "../events/NotificationSent.js";
import NotificationFailed from "../events/NotificationFailed.js";
import NotificationRetryScheduled from "../events/NotificationRetryScheduled.js";

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
  #retryCount;
  #lastError;

  #domainEvents = [];

  constructor({
    id,
    recipient,
    message,
    channel,
    priority,
    status,
    createdAt,
    sentAt,
    failedAt,
    retryCount = 0,
    lastError = null,
  }) {

    if (!id) {
      throw new Error("Notification id is required");
    }

    if (!recipient) {
      throw new Error("Recipient is required");
    }

    if (!message) {
      throw new Error("Message is required");
    }

    this.#id = id;
    this.#recipient = recipient;
    this.#message = message;

    this.#channel =
      channel instanceof Channel
        ? channel
        : new Channel(channel);

    this.#priority =
      priority instanceof Priority
        ? priority
        : new Priority(priority);

    this.#status =
      status instanceof NotificationStatus
        ? status
        : NotificationStatus.pending();

    this.#createdAt = createdAt || new Date();
    this.#sentAt = sentAt || null;
    this.#failedAt = failedAt || null;

    this.#retryCount = retryCount;
    this.#lastError = lastError;
  }

  get id() { return this.#id; }
  get recipient() { return this.#recipient; }
  get message() { return this.#message; }
  get channel() { return this.#channel; }
  get priority() { return this.#priority; }
  get status() { return this.#status; }
  get createdAt() { return this.#createdAt; }
  get sentAt() { return this.#sentAt; }
  get failedAt() { return this.#failedAt; }

  get retryCount() {
    return this.#retryCount;
  }

  get lastError() {
    return this.#lastError;
  }

  get domainEvents() {
    return [...this.#domainEvents];
  }

  clearEvents() {
    this.#domainEvents.length = 0;
  }

  static create({
    id,
    recipient,
    message,
    channel,
    priority,
  }) {

    const notification =
      new Notification({
        id,
        recipient,
        message,
        channel,
        priority,
        status: NotificationStatus.pending(),
        createdAt: new Date(),
        retryCount: 0,
        lastError: null,
      });

    notification.#addDomainEvent(
      new NotificationCreated({
        id,
        recipient,
        message,
        channel: notification.#channel,
        priority: notification.#priority,
        createdAt: notification.#createdAt,
      }),
    );

    return notification;
  }

  #addDomainEvent(event) {
    this.#domainEvents.push(event);
  }

  #assertTransition(targetStatus) {

    if (
      !this.#status.canTransitionTo(
        targetStatus,
      )
    ) {

      throw new Error(
        `Invalid transition from ${this.#status.value} to ${targetStatus.value}`,
      );

    }

  }

  markAsProcessing() {

    const target =
      NotificationStatus.processing();

    this.#assertTransition(target);

    return this.#clone({
      status: target,
    });

  }

  markAsSent() {

    const target =
      NotificationStatus.sent();

    this.#assertTransition(target);

    const updated =
      this.#clone({
        status: target,
        sentAt: new Date(),
        lastError: null,
      });

    updated.#addDomainEvent(
      new NotificationSent(this.#id),
    );

    return updated;
  }

  markAsFailed(errorMessage = null) {

    const target =
      NotificationStatus.failed();

    this.#assertTransition(target);

    const updated =
      this.#clone({
        status: target,
        failedAt: new Date(),
        retryCount: this.#retryCount + 1,
        lastError: errorMessage,
      });

    updated.#addDomainEvent(
      new NotificationFailed(this.#id),
    );

    return updated;
  }

  markAsDead() {

    const target =
      NotificationStatus.dead();

    this.#assertTransition(target);

    return this.#clone({
      status: target,
    });

  }

  retry() {

    const target =
      NotificationStatus.retrying();

    this.#assertTransition(target);

    const updated =
      this.#clone({
        status: target,
      });

    updated.#addDomainEvent(
      new NotificationRetryScheduled(
        this.#id,
      ),
    );

    return updated;
  }

  #clone(overrides = {}) {

    return new Notification({
      id: this.#id,
      recipient: this.#recipient,
      message: this.#message,
      channel: this.#channel,
      priority: this.#priority,

      status:
        overrides.status ??
        this.#status,

      createdAt:
        this.#createdAt,

      sentAt:
        overrides.sentAt ??
        this.#sentAt,

      failedAt:
        overrides.failedAt ??
        this.#failedAt,

      retryCount:
        overrides.retryCount ??
        this.#retryCount,

      lastError:
        overrides.lastError ??
        this.#lastError,
    });

  }

  equals(other) {

    return (
      other instanceof Notification &&
      other.id === this.#id
    );

  }

}