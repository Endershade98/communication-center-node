// tests/unit/domain/ValueObjects.test.js

import Channel from "../../../src/domain/value-objects/Channel.js";
import Priority from "../../../src/domain/value-objects/Priority.js";

describe("Value Objects", () => {

  test("Channel equality", () => {
    expect(Channel.email().equals(Channel.email())).toBe(true);
  });

  test("Priority equality", () => {
    expect(Priority.high().equals(Priority.high())).toBe(true);
  });

  test("invalid Channel throws", () => {
    expect(() => new Channel("WHATSAPP")).toThrow();
  });

  test("invalid Priority throws", () => {
    expect(() => new Priority("ULTRA")).toThrow();
  });

});