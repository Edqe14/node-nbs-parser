import { SongInfo } from "../decoder";
import { type Note } from "./note";

export class Song {
  public notes: Map<number, Note>;
  public lastTick: number;

  public length: number;
  public nbsVersion: number;
  public vanillaInstrumentCount?: number;
  public layerCount: number;

  public name: string;
  public originalAuthor: string;
  public author: string;
  public description: string;
  public midiSchemName: string;

  public tempo: number;
  public timeSignature: number;

  public autoSave: boolean;
  public autoSaveDuration: number;

  public minutesSpent: number;
  public leftClicks: number;
  public rightClicks: number;
  public blocksAdded: number;
  public blocksRemoved: number;

  public loop?: boolean;
  public maxLoopCount?: number;
  public loopStartTick?: number;

  constructor(info: SongInfo) {
    this.length = info.length;
    this.nbsVersion = info.nbsVersion;
    this.vanillaInstrumentCount = info.vanillaInstrumentCount;
    this.layerCount = info.layerCount;

    this.name = info.name;
    this.author = info.author;
    this.originalAuthor = info.originalAuthor;
    this.description = info.description;
    this.midiSchemName = info.midiSchemName;

    this.tempo = info.tempo;
    this.timeSignature = info.timeSignature;

    this.autoSave = info.autoSave;
    this.autoSaveDuration = info.autoSaveDuration;

    this.minutesSpent = info.minutesSpent;
    this.leftClicks = info.leftClicks;
    this.rightClicks = info.rightClicks;
    this.blocksAdded = info.blocksAdded;
    this.blocksRemoved = info.blocksRemoved;

    this.loop = info.loop;
    this.maxLoopCount = info.maxLoopCount;
    this.loopStartTick = info.loopStartTick;

    this.notes = info.notes;
    this.lastTick = Math.max(...this.notes.keys());
  }

  get lengthSeconds() {
    return this.length / this.tempo;
  }
}
