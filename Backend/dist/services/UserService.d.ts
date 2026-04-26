import type { IUser } from '../repositories/UserRepository.js';
export declare class UserService {
    private static userRepository;
    static register(username: string, password: string): Promise<string>;
    static login(username: string, password: string): Promise<string>;
    static authenticate(user: IUser, roleName: string): Promise<string>;
    static getUserById(id: number): Promise<IUser | null>;
    static getAllUsers(): Promise<IUser[]>;
    static updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null>;
    static deleteUser(id: number): Promise<boolean>;
}
//# sourceMappingURL=UserService.d.ts.map