// src/domain/events/NotificationSent.js

export default class NotificationSent {

  #id;
  #sentAt;

  constructor({ id, sentAt }) {
    if (!id) throw new Error("Event must have id");

    this.#id = id;
    this.#sentAt = sentAt || new Date();

    Object.freeze(this); // immutabile
  }

  get id() { return this.#id; }
  get sentAt() { return this.#sentAt; }

  toJSON() {
    return {
      id: this.#id,
      sentAt: this.#sentAt
    };
  }

}