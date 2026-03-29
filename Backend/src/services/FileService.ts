import type { IFile } from '../repositories/FileRepository.js';
import { FileRepository } from '../repositories/FileRepository.js';

export class FileService {
  private static fileRepository = new FileRepository();

  /**
   * Add a file record to the database
   */
  static async addFile(file: IFile): Promise<IFile> {
    return this.fileRepository.create(file);
  }

  /**
   * Get all files
   */
  static async getAllFiles(): Promise<IFile[]> {
    return this.fileRepository.findAll();
  }

  /**
   * Get file by ID
   */
  static async getFileById(id: number): Promise<IFile | null> {
    return this.fileRepository.findById(id);
  }

  /**
   * Search files by filename
   */
  static async searchFilesByName(filename: string): Promise<IFile[]> {
    return this.fileRepository.findByFilename(filename);
  }

  /**
   * Get files uploaded by a specific user
   */
  static async getFilesByUser(userId: number): Promise<IFile[]> {
    return this.fileRepository.findByUploadedBy(userId);
  }

  /**
   * Get recent files
   */
  static async getRecentFiles(limit: number = 10): Promise<IFile[]> {
    return this.fileRepository.getRecent(limit);
  }

  /**
   * Update file metadata
   */
  static async updateFile(id: number, file: Partial<IFile>): Promise<IFile | null> {
    return this.fileRepository.update(id, file);
  }

  /**
   * Delete a file
   */
  static async deleteFile(id: number): Promise<boolean> {
    return this.fileRepository.deleteById(id);
  }

  /**
   * Get files by mime type
   */
  static async getFilesByMimeType(mimeType: string): Promise<IFile[]> {
    return this.fileRepository.findByMimeType(mimeType);
  }

  /**
   * Get total storage used by a user
   */
  static async getTotalUserStorage(userId: number): Promise<number> {
    return this.fileRepository.getTotalSizeByUser(userId);
  }

  /**
   * Get file count
   */
  static async getFileCount(): Promise<number> {
    return this.fileRepository.count();
  }
}