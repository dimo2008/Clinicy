import { FileRepository } from '../repositories/FileRepository.js';
export class FileService {
    static fileRepository = new FileRepository();
    /**
     * Add a file record to the database
     */
    static async addFile(file) {
        return this.fileRepository.create(file);
    }
    /**
     * Get all files
     */
    static async getAllFiles() {
        return this.fileRepository.findAll();
    }
    /**
     * Get file by ID
     */
    static async getFileById(id) {
        return this.fileRepository.findById(id);
    }
    /**
     * Search files by filename
     */
    static async searchFilesByName(filename) {
        return this.fileRepository.findByFilename(filename);
    }
    /**
     * Get files uploaded by a specific user
     */
    static async getFilesByUser(userId) {
        return this.fileRepository.findByUploadedBy(userId);
    }
    /**
     * Get recent files
     */
    static async getRecentFiles(limit = 10) {
        return this.fileRepository.getRecent(limit);
    }
    /**
     * Update file metadata
     */
    static async updateFile(id, file) {
        return this.fileRepository.update(id, file);
    }
    /**
     * Delete a file
     */
    static async deleteFile(id) {
        return this.fileRepository.deleteById(id);
    }
    /**
     * Get files by mime type
     */
    static async getFilesByMimeType(mimeType) {
        return this.fileRepository.findByMimeType(mimeType);
    }
    /**
     * Get total storage used by a user
     */
    static async getTotalUserStorage(userId) {
        return this.fileRepository.getTotalSizeByUser(userId);
    }
    /**
     * Get file count
     */
    static async getFileCount() {
        return this.fileRepository.count();
    }
}
//# sourceMappingURL=FileService.js.map