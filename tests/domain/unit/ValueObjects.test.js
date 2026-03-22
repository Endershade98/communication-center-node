import Channel from "../../../src/domain/value-objects/Channel.js";
import Priority from "../../../src/domain/value-objects/Priority.js";
import NotificationStatus from "../../../src/domain/value-objects/NotificationStatus.js";

describe("Value Objects", () => {

  it("should create valid Channel", () => {
    const channel = new Channel("EMAIL");
    expect(channel.value).toBe("EMAIL");
  });

  it("should throw on invalid Channel", () => {
    expect(() => new Channel("FAX")).toThrow();
  });

  it("should create valid Priority", () => {
    const priority = new Priority("HIGH");
    expect(priority.value).toBe("HIGH");
  });

  it("should create valid Status", () => {
    const status = NotificationStatus.pending();
    expect(status.value).toBe("PENDING");
  });

});
