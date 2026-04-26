import type { IPatient } from '../repositories/PatientRepository.js';
export declare class PatientService {
    private static patientRepository;
    static getAllPatients(): Promise<IPatient[]>;
    static getRecentPatients(limit?: number): Promise<IPatient[]>;
    static createPatient(data: Omit<IPatient, 'id'>): Promise<IPatient>;
    static getPatientById(id: number): Promise<IPatient | null>;
    static updatePatient(id: number, data: Partial<IPatient>): Promise<IPatient | null>;
    static deletePatient(id: number): Promise<boolean>;
    static searchPatients(name: string): Promise<IPatient[]>;
    static getPatientsByAgeRange(minAge: number, maxAge: number): Promise<IPatient[]>;
    static getPatientByEmail(email: string): Promise<IPatient | null>;
    static getPatientCount(): Promise<number>;
}
//# sourceMappingURL=PatientService.d.ts.map