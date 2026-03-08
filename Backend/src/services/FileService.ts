import { promises as fsPromises } from 'fs';

export class FileService {
  static async appendToFile(name: string): Promise<void> {
    const myFile = await fsPromises.open(name + ".txt", "a+");
    await myFile.write(name);
    await myFile.close();
  }
}