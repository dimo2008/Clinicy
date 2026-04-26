import type { IFile } from '../repositories/FileRepository.js';
export declare class FileService {
    private static fileRepository;
    /**
     * Add a file record to the database
     */
    static addFile(file: IFile): Promise<IFile>;
    /**
     * Get all files
     */
    static getAllFiles(): Promise<IFile[]>;
    /**
     * Get file by ID
     */
    static getFileById(id: number): Promise<IFile | null>;
    /**
     * Search files by filename
     */
    static searchFilesByName(filename: string): Promise<IFile[]>;
    /**
     * Get files uploaded by a specific user
     */
    static getFilesByUser(userId: number): Promise<IFile[]>;
    /**
     * Get recent files
     */
    static getRecentFiles(limit?: number): Promise<IFile[]>;
    /**
     * Update file metadata
     */
    static updateFile(id: number, file: Partial<IFile>): Promise<IFile | null>;
    /**
     * Delete a file
     */
    static deleteFile(id: number): Promise<boolean>;
    /**
     * Get files by mime type
     */
    static getFilesByMimeType(mimeType: string): Promise<IFile[]>;
    /**
     * Get total storage used by a user
     */
    static getTotalUserStorage(userId: number): Promise<number>;
    /**
     * Get file count
     */
    static getFileCount(): Promise<number>;
}
//# sourceMappingURL=FileService.d.ts.map