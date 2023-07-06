import { describe, expect, it } from "vitest";
import { NBSDecoder, Note } from "../../src";
import { readFileSync } from "node:fs";
import path from "node:path";

const decoder = new NBSDecoder();

describe("Gravity Falls Theme", () => {
  const file = readFileSync(path.join(__dirname, "files", "gravity_falls_theme.nbs"));
  const song = decoder.parse(file);

  it("should have the correct nbs version", () => {
    expect(song.nbsVersion).toBe(0);
  });

  it("should have the correct length", () => {
    expect(song.length).toBe(424);
    expect(song.lengthSeconds).toBeCloseTo(39.44);
  });

  it("should have the correct time signature", () => {
    expect(song.timeSignature).toBe(4);
  });

  it("should have the correct name", () => {
    expect(song.name).toBe("Gravity Falls Theme");
  });

  it("should have the correct author", () => {
    expect(song.author).toBe("SalmonDE");
  });

  it("should have the correct original author", () => {
    expect(song.originalAuthor).toBe("Disney");
  });

  it("should have the correct tempo (ticks per second)", () => {
    expect(song.tempo).toBeCloseTo(10.75);
  });

  it("should have the correct last tick", () => {
    expect(song.lastTick).toBe(790);
  });

  const notesIterator = song.notes.values();

  it("should have the correct first note", () => {
    const note = notesIterator.next().value as Note;

    expect(note.instrument.id).toBe(4);
    expect(note.noteLevel).toBe(6);
    expect(note.velocity).toBeUndefined();
    expect(note.panning).toBeUndefined();
    expect(note.pitch).toBeUndefined();
  });
});

describe("You're Welcome", () => {
  const file = readFileSync(path.join(__dirname, "files", "youre_welcome.nbs"));
  const song = decoder.parse(file);

  it("should have the correct nbs version", () => {
    expect(song.nbsVersion).toBe(5);
  });

  it("should have the correct length", () => {
    expect(song.length).toBe(2720);
    expect(song.lengthSeconds).toBeCloseTo(151.11);
  });

  it("should have the correct time signature", () => {
    expect(song.timeSignature).toBe(4);
  });

  it("should have the correct name", () => {
    expect(song.name).toBe("");
  });

  it("should have the correct author", () => {
    expect(song.author).toBe("");
  });

  it("should have the correct original author", () => {
    expect(song.originalAuthor).toBe("");
  });

  it("should have the correct tempo (ticks per second)", () => {
    expect(song.tempo).toBe(18);
  });

  it("should have the correct last tick", () => {
    expect(song.lastTick).toBe(9951676);
  });

  const notesIterator = song.notes.values();

  it("should have the correct first note", () => {
    const note = notesIterator.next().value as Note;

    expect(note.instrument.id).toBe(0);
    expect(note.noteLevel).toBe(-33);
    expect(note.velocity).toBe(0);
    expect(note.panning).toBe(3);
    expect(note.pitch).toBe(256);
  });
});
