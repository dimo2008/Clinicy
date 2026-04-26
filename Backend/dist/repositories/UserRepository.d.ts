import { BaseRepository } from './BaseRepository.js';
export interface IUser {
    id?: number;
    username: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
}
/**
 * User Repository - Handles all user database operations
 */
export declare class UserRepository extends BaseRepository<IUser> {
    constructor();
    /**
     * Create a new user
     */
    create(user: IUser): Promise<IUser>;
    /**
     * Find user by username
     */
    findByUsername(username: string): Promise<IUser | null>;
    /**
     * Update user password
     */
    updatePassword(id: number, newPassword: string): Promise<IUser | null>;
    /**
     * Update user
     */
    update(id: number, user: Partial<IUser>): Promise<IUser | null>;
    /**
     * Delete user by username
     */
    deleteByUsername(username: string): Promise<boolean>;
    /**
     * Check if user exists
     */
    exists(username: string): Promise<boolean>;
}
//# sourceMappingURL=UserRepository.d.ts.map