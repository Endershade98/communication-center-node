// src/domain/value-objects/Channel.js
const VALID_CHANNELS = Object.freeze([
  "EMAIL",
  "SMS",
  "PUSH"
]);

export default class Channel {

  #value;

  constructor(value) {
    if (!VALID_CHANNELS.includes(value)) {
      throw new Error(`Invalid Channel: ${value}`);
    }
    this.#value = value;
    // Object.freeze(this);
  }

  get value() {
    return this.#value;
  }

  static email() { return new Channel("EMAIL"); }
  static sms() { return new Channel("SMS"); }
  static push() { return new Channel("PUSH"); }

  equals(other) {
    if (!(other instanceof Channel)) return false;
    return this.#value === other.value;
  }

}