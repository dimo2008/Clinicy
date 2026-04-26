import { BaseRepository } from './BaseRepository.js';
export interface IFile {
    id?: number;
    filename: string;
    filepath: string;
    size: number;
    mime_type?: string;
    uploaded_by?: number;
    created_at?: Date;
    updated_at?: Date;
}
/**
 * File Repository - Handles all file database operations
 */
export declare class FileRepository extends BaseRepository<IFile> {
    constructor();
    /**
     * Create a new file record
     */
    create(file: IFile): Promise<IFile>;
    /**
     * Update file record
     */
    update(id: number, file: Partial<IFile>): Promise<IFile | null>;
    /**
     * Find files by filename
     */
    findByFilename(filename: string): Promise<IFile[]>;
    /**
     * Get files uploaded by a user
     */
    findByUploadedBy(userId: number): Promise<IFile[]>;
    /**
     * Get recent files
     */
    getRecent(limit?: number): Promise<IFile[]>;
    /**
     * Find by mime type
     */
    findByMimeType(mimeType: string): Promise<IFile[]>;
    /**
     * Get total file size for a user
     */
    getTotalSizeByUser(userId: number): Promise<number>;
}
//# sourceMappingURL=FileRepository.d.ts.map