import type { IPatient } from '../repositories/PatientRepository.js';
import { PatientRepository } from '../repositories/PatientRepository.js';

export class PatientService {
  private static patientRepository = new PatientRepository();

  static async getAllPatients(): Promise<IPatient[]> {
    return this.patientRepository.findAll();
  }

  static async getRecentPatients(limit: number = 10): Promise<IPatient[]> {
    return this.patientRepository.getRecent(limit);
  }

  static async createPatient(data: Omit<IPatient, 'id'>): Promise<IPatient> {
    return this.patientRepository.create(data);
  }

  static async getPatientById(id: number): Promise<IPatient | null> {
    return this.patientRepository.findById(id);
  }

  static async updatePatient(id: number, data: Partial<IPatient>): Promise<IPatient | null> {
    return this.patientRepository.update(id, data);
  }

  static async deletePatient(id: number): Promise<boolean> {
    return this.patientRepository.deleteById(id);
  }

  static async searchPatients(name: string): Promise<IPatient[]> {
    return this.patientRepository.searchByName(name);
  }

  static async getPatientsByAgeRange(minAge: number, maxAge: number): Promise<IPatient[]> {
    return this.patientRepository.findByAgeRange(minAge, maxAge);
  }

  static async getPatientByEmail(email: string): Promise<IPatient | null> {
    return this.patientRepository.findByEmail(email);
  }

  static async getPatientCount(): Promise<number> {
    return this.patientRepository.count();
  }
}