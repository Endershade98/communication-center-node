// src/domain/value-objects/Priority.js

const VALID_PRIORITIES = Object.freeze([
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
]);

export default class Priority {

  #value;

  constructor(value) {
    if (!VALID_PRIORITIES.includes(value)) {
      throw new Error(`Invalid Priority: ${value}`);
    }

    this.#value = value;

    Object.freeze(this);
  }

  get value() {
    return this.#value;
  }

  static low() {
    return new Priority("LOW");
  }

  static medium() {
    return new Priority("MEDIUM");
  }

  static high() {
    return new Priority("HIGH");
  }

  static critical() {
    return new Priority("CRITICAL");
  }

  equals(other) {
    return (
      other instanceof Priority &&
      other.value === this.#value
    );
  }
}