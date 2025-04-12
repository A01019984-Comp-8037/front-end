import { describe, it, expect, vi } from "vitest";
import { dbHeader } from "../fetch"; // Adjust this import
import { getCookie } from "../cookies";
vi.mock("../cookies", () => ({
  getCookie: vi.fn(() => "mocked-access-token"),
}));

describe("dbHeader function", () => {
  it("should return the correct header with the token if token exists", () => {
    const result = dbHeader();

    expect(result).toEqual({
      "content-type": "application/json",
      Authorization: "Bearer mocked-access-token",
    });
    expect(getCookie).toHaveBeenCalledWith("access_token");
  });
});
