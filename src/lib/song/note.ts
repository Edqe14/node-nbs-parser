import { Instrument } from "minecraft-data";
import { type NoteInfo } from "../decoder";

export class Note {
  public instrument: Instrument;
  public noteLevel: number;
  public velocity?: number;
  public panning?: number;
  public pitch?: number;

  constructor(instrument: Instrument, noteInfo: NoteInfo) {
    this.instrument = instrument;
    this.noteLevel = noteInfo.key;
    this.velocity = noteInfo.velocity;
    this.panning = noteInfo.panning;
    this.pitch = noteInfo.pitch;
  }

  setInstrument(instrument: Instrument) {
    this.instrument = instrument;

    return this;
  }

  setNoteLevel(noteLevel: number) {
    this.noteLevel = noteLevel;

    return this;
  }

  equals(note: Note) {
    return this.instrument === note.instrument && this.noteLevel === note.noteLevel;
  }

  toString() {
    return `Note{
  instrument=${this.instrument.name},
  noteLevel=${this.noteLevel}
    }`;
  }
}
