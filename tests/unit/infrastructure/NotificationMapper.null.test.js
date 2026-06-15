// tests/unit/infrastructure/NotificationMapper.null.test.js

import NotificationMapper from "../../../src/infrastructure/mappers/NotificationMapper.js";

describe("NotificationMapper null safety", () => {

  test("toDomain returns null", () => {
    expect(NotificationMapper.toDomain(null)).toBeNull();
  });

  test("toDomainList filters nulls", () => {
    const result = NotificationMapper.toDomainList([null, null]);
    expect(result).toEqual([]);
  });

});