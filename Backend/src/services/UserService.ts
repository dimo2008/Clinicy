import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { IUser } from '../repositories/UserRepository.js';
import { UserRepository } from '../repositories/UserRepository.js';

export class UserService {
  private static userRepository = new UserRepository();

  static async register(username: string, password: string): Promise<string> {
    if (!username || !password) {
      throw new Error('Username and password required');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return 'User registered successfully';
  }

  static async login(username: string, password: string): Promise<string> {
    if (!username || !password) {
      throw new Error('Username and password required');
    }

    // Find user by username
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    return await this.authenticate(user, 'user');
  }

  static async authenticate(user: IUser, roleName: string): Promise<string> {
    const payload = {
      sub: user.id,
      username: user.username,
      role: roleName,
    };
    const secret = process.env.JWT_SECRET || 'CHANGE_ME_TO_SECRET_IN_PROD';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  static async getUserById(id: number): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  static async getAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  static async updateUser(id: number, userData: Partial<IUser>): Promise<IUser | null> {
    return this.userRepository.update(id, userData);
  }

  static async deleteUser(id: number): Promise<boolean> {
    return this.userRepository.deleteById(id);
  }
}