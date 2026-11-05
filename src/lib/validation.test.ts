import { describe, expect, it } from "vitest";
import { checkAvailability } from "./validation";
import type { Room, Booking, Interval } from "./types";

const NOW = 540; // 09:00

function fixtures(): { rooms: Room[]; bookings: Booking[] } {
  return {
    rooms: [
      { id: "r1", name: "Newton 101", building: "Science Block", capacity: 40, blocked: false },
      { id: "r2", name: "Curie 205", building: "Science Block", capacity: 25, blocked: false },
      { id: "r3", name: "Blocked 303", building: "IT Wing", capacity: 30, blocked: true },
    ],
    bookings: [
      { id: "b1", room: "r1", start: 600, end: 660, bookedBy: "Teacher" },
    ],
  };
}

function check(interval: Interval, roomId = "r1") {
  const { rooms, bookings } = fixtures();
  return checkAvailability(roomId, interval, NOW, rooms, bookings);
}

describe("Smart Campus - checkAvailability (Practice #08 baseline)", () => {
  it("T01 / AC4: touching after an existing booking is available", () => {
    expect(check({ start: 660, end: 720 }).decision).toBe("available");
  });

  it("T02 / AC1: starting exactly now is rejected", () => {
    expect(check({ start: 540, end: 570 }).decision).toBe("unavailable");
  });

  it("T03 / AC1: zero duration is rejected", () => {
    expect(check({ start: 720, end: 720 }).decision).toBe("unavailable");
  });

  it("T04 / AC1: reversed interval is rejected", () => {
    expect(check({ start: 750, end: 720 }).decision).toBe("unavailable");
  });

  it("T05 / AC1: end beyond 24:00 is rejected", () => {
    expect(check({ start: 1380, end: 1441 }).decision).toBe("unavailable");
  });

  it("T06 / AC2: exactly 120 minutes is allowed", () => {
    expect(check({ start: 720, end: 840 }).decision).toBe("available");
  });

  it("T07 / AC2: 121 minutes is rejected", () => {
    expect(check({ start: 720, end: 841 }).decision).toBe("unavailable");
  });

  it("T08 / AC3: blocked room is rejected", () => {
    expect(check({ start: 720, end: 780 }, "r3").decision).toBe("unavailable");
  });

  it("T09 / AC4: partially overlapping interval is rejected", () => {
    expect(check({ start: 630, end: 690 }).decision).toBe("unavailable");
  });

  it("T10 / AC4: touching before an existing booking is available", () => {
    expect(check({ start: 570, end: 600 }).decision).toBe("available");
  });

  it("T11 / AC5: successful check does not modify bookings", () => {
    const { rooms, bookings } = fixtures();
    const before = JSON.stringify(bookings);
    checkAvailability("r1", { start: 660, end: 720 }, NOW, rooms, bookings);
    expect(JSON.stringify(bookings)).toBe(before);
  });

  it("T12 / AC5: rejected check does not modify bookings", () => {
    const { rooms, bookings } = fixtures();
    const before = JSON.stringify(bookings);
    checkAvailability("r1", { start: 630, end: 690 }, NOW, rooms, bookings);
    expect(JSON.stringify(bookings)).toBe(before);
  });

  it("T13 / AC4: booking in another room is not a conflict", () => {
    expect(check({ start: 600, end: 660 }, "r2").decision).toBe("available");
  });

  it("T14 / AC3: missing room ID is rejected", () => {
    expect(check({ start: 720, end: 780 }, "unknown").decision).toBe("unavailable");
  });

  it("T15 / AC1: past start time is rejected", () => {
    expect(check({ start: 500, end: 550 }).decision).toBe("unavailable");
  });

  it("T16 / AC1: non-numeric start is rejected", () => {
    expect(check({ start: Number.NaN, end: 780 }).decision).toBe("unavailable");
  });

  it("T17 / AC4: identical interval to existing booking is rejected", () => {
    expect(check({ start: 600, end: 660 }).decision).toBe("unavailable");
  });
});
