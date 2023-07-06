import { Note, Song } from "../song";
import { NoteInfo, SongInfo, createSongInfo } from "./parse/parseInfo";
import { type ParseMeta } from "./parse/parseMeta";
import { SongDecoder } from "./songDecoder";

export class NBSDecoder extends SongDecoder {
  parse(input: Buffer) {
    const meta: ParseMeta = { offset: 0, input };
    const info: SongInfo = {
      ...createSongInfo(),
      length: this.readShort(meta)
    };

    if (info.length === 0) {
      info.nbsVersion = this.readByte(meta);

      info.vanillaInstrumentCount = this.readByte(meta);

      if (info.nbsVersion >= 3) {
        info.length = this.readShort(meta);
      }
    }

    // Parse metadata
    info.layerCount = this.readShort(meta);
    info.name = this.readString(meta);
    info.author = this.readString(meta);
    info.originalAuthor = this.readString(meta);
    info.description = this.readString(meta);
    info.tempo = this.readShort(meta) / 100.0;

    info.autoSave = this.readByte(meta) === 1;
    info.autoSaveDuration = this.readByte(meta);
    info.timeSignature = this.readByte(meta);

    info.minutesSpent = this.readInt(meta);
    info.leftClicks = this.readInt(meta);
    info.rightClicks = this.readInt(meta);
    info.blocksAdded = this.readInt(meta);
    info.blocksRemoved = this.readInt(meta);
    info.midiSchemName = this.readString(meta);

    if (info.nbsVersion >= 4) {
      info.loop = this.readByte(meta) === 1;
      info.maxLoopCount = this.readShort(meta);
      info.loopStartTick = this.readShort(meta);
    }

    // Parse notes
    let tick = -1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const jumpTicks = this.readShort(meta);
      if (jumpTicks === 0) break;

      tick += jumpTicks * (20.0 / info.tempo);

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const jumpLayer = this.readShort(meta);
        if (jumpLayer === 0) break;

        const noteInfo: NoteInfo = {
          instrument: this.readByte(meta),
          key: this.readByte(meta)
        };

        if (info.nbsVersion >= 4) {
          noteInfo.velocity = this.readByte(meta);
          noteInfo.panning = this.readByte(meta);
          noteInfo.pitch = this.readShort(meta);
        }

        const inst = this.getInstrumentById(noteInfo.instrument);

        if (!inst) continue;

        const note = new Note(inst, noteInfo);
        info.notes.set(Math.round(tick), note);
      }
    }

    // TODO: Parse layers
    // TODO: Parse custom instruments

    return new Song(info);
  }

  protected readShort(meta: ParseMeta) {
    const short = meta.input.readIntLE(meta.offset, 2);

    meta.offset += 2;

    return short;
  }

  protected readByte(meta: ParseMeta) {
    const byte = meta.input.readIntLE(meta.offset, 1);

    meta.offset += 1;

    return byte;
  }

  protected readInt(meta: ParseMeta) {
    const int = meta.input.readIntLE(meta.offset, 4);

    meta.offset += 4;

    return int;
  }

  protected readString(meta: ParseMeta) {
    const length = this.readInt(meta);
    if (length < 0) throw new Error("Invalid string length, cannot be negative");
    if (length > meta.input.length) throw new Error("Invalid string length, exceeds input length");

    const chars = new Array(length);

    for (let i = 0; i < length; i++) {
      const char = String.fromCharCode(this.readByte(meta));
      chars[i] = char;
    }

    return chars.join("");
  }
}
