import MinecraftData from "minecraft-data";
import { Song } from "../song";

export abstract class SongDecoder {
  public instrumentData: MinecraftData.IndexedData["instruments"];

  constructor(version: string | number = "1.20.1") {
    this.instrumentData = MinecraftData(version).instruments;
  }

  getInstrumentById(id: number) {
    const int = Math.floor(id);

    return this.instrumentData[int];
  }

  getInstrumentByName(name: string) {
    return Object.values(this.instrumentData).find((instrument) => instrument.name === name);
  }

  abstract parse(input: Buffer): Song;
}
