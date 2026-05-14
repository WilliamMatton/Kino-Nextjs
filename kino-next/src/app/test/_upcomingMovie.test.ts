import { describe, expect, it, jest } from '@jest/globals';
import { getFirstFiveScreenings } from "../api/reviews/route";

describe("getFirstFiveScreenings", () => {
  it("should fetch screenings for next five days", async () => {

        jest.useFakeTimers();
        jest.setSystemTime(new Date('2026-05-11T12:00:00Z'));

globalThis.fetch = jest.fn(async () => ({
  json: async () => ({
    data: [
      { attributes: { start_time: "2026-05-11T17:00:00.000Z" } },
      { attributes: { start_time: "2026-05-11T21:00:00.000Z" } },
      { attributes: { start_time: "2026-05-12T12:00:00.000Z" } },
      { attributes: { start_time: "2026-05-12T21:00:00.000Z" } },
      { attributes: { start_time: "2026-05-13T12:00:00.000Z" } },
    ],
  }),
})) as any;

const result = await getFirstFiveScreenings("movie-id");

expect(result[0].attributes.start_time).toBe('2026-05-11T17:00:00.000Z');
expect(result[1].attributes.start_time).toBe('2026-05-11T21:00:00.000Z');
expect(result[2].attributes.start_time).toBe('2026-05-12T12:00:00.000Z');
expect(result[3].attributes.start_time).toBe('2026-05-12T21:00:00.000Z');
expect(result[4].attributes.start_time).toBe('2026-05-13T12:00:00.000Z');
 });
});