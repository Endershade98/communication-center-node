// src/domain/value-objects/NotificationStatus.js
const VALID_STATUSES = Object.freeze([
  "PENDING",
  "SENT",
  "FAILED",
  "RETRYING"
]);

export default class NotificationStatus {

  #value;

  constructor(value) {
    if (!VALID_STATUSES.includes(value)) {
      throw new Error(`Invalid NotificationStatus: ${value}`);
    }
    this.#value = value;
    Object.freeze(this); // rende l'oggetto immutabile
  }

  get value() {
    return this.#value;
  }

  // helper statici per creare istanze comuni
  static pending() { return new NotificationStatus("PENDING"); }
  static sent() { return new NotificationStatus("SENT"); }
  static failed() { return new NotificationStatus("FAILED"); }
  static retrying() { return new NotificationStatus("RETRYING"); }

  equals(other) {
    if (!(other instanceof NotificationStatus)) return false;
    return this.#value === other.value;
  }

}