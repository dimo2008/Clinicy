import { BaseRepository } from './BaseRepository.js';
export interface IPatient {
    id?: number;
    name: string;
    age: number;
    email?: string;
    phone?: string;
    address?: string;
    created_at?: Date;
    updated_at?: Date;
}
/**
 * Patient Repository - Handles all patient database operations
 */
export declare class PatientRepository extends BaseRepository<IPatient> {
    constructor();
    /**
     * Create a new patient
     */
    create(patient: IPatient): Promise<IPatient>;
    /**
     * Update patient
     */
    update(id: number, patient: Partial<IPatient>): Promise<IPatient | null>;
    /**
     * Search patients by name
     */
    searchByName(name: string): Promise<IPatient[]>;
    /**
     * Get patients within age range
     */
    findByAgeRange(minAge: number, maxAge: number): Promise<IPatient[]>;
    /**
     * Find patient by email
     */
    findByEmail(email: string): Promise<IPatient | null>;
    /**
     * Get recent patients
     */
    getRecent(limit?: number): Promise<IPatient[]>;
}
//# sourceMappingURL=PatientRepository.d.ts.map