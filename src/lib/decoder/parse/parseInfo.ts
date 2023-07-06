import { type Note } from "../../song";

export interface SongInfo {
  length: number;
  nbsVersion: number;
  vanillaInstrumentCount?: number;

  layerCount: number;
  name: string;
  author: string;
  originalAuthor: string;
  description: string;

  tempo: number;
  timeSignature: number;

  autoSave: boolean;
  autoSaveDuration: number;

  minutesSpent: number;
  leftClicks: number;
  rightClicks: number;
  blocksAdded: number;
  blocksRemoved: number;
  midiSchemName: string;

  loop?: boolean;
  maxLoopCount?: number;
  loopStartTick?: number;

  notes: Map<number, Note>;
}

export interface NoteInfo {
  instrument: number;
  key: number;
  velocity?: number;
  panning?: number;
  pitch?: number;
}

export const createSongInfo = (): SongInfo => ({
  length: 0,
  nbsVersion: 0,
  layerCount: 0,
  name: "",
  author: "",
  originalAuthor: "",
  description: "",
  tempo: 0,
  timeSignature: 0,
  autoSave: false,
  autoSaveDuration: 0,
  minutesSpent: 0,
  leftClicks: 0,
  rightClicks: 0,
  blocksAdded: 0,
  blocksRemoved: 0,
  midiSchemName: "",
  notes: new Map<number, Note>()
});
