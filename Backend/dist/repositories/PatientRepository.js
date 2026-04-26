import DBService from '../database/DBService.js';
import { BaseRepository } from './BaseRepository.js';
/**
 * Patient Repository - Handles all patient database operations
 */
export class PatientRepository extends BaseRepository {
    constructor() {
        super('patients');
    }
    /**
     * Create a new patient
     */
    async create(patient) {
        const query = `
      INSERT INTO ${this.tableName} (name, age, email, phone, address, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;
        return DBService.queryOne(query, [
            patient.name,
            patient.age,
            patient.email || null,
            patient.phone || null,
            patient.address || null,
        ]);
    }
    /**
     * Update patient
     */
    async update(id, patient) {
        const updates = [];
        const values = [];
        let paramIndex = 1;
        if (patient.name !== undefined) {
            updates.push(`name = $${paramIndex}`);
            values.push(patient.name);
            paramIndex++;
        }
        if (patient.age !== undefined) {
            updates.push(`age = $${paramIndex}`);
            values.push(patient.age);
            paramIndex++;
        }
        if (patient.email !== undefined) {
            updates.push(`email = $${paramIndex}`);
            values.push(patient.email || null);
            paramIndex++;
        }
        if (patient.phone !== undefined) {
            updates.push(`phone = $${paramIndex}`);
            values.push(patient.phone || null);
            paramIndex++;
        }
        if (patient.address !== undefined) {
            updates.push(`address = $${paramIndex}`);
            values.push(patient.address || null);
            paramIndex++;
        }
        if (updates.length === 0) {
            return this.findById(id);
        }
        updates.push(`updated_at = NOW()`);
        values.push(id);
        const query = `
      UPDATE ${this.tableName}
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;
        return DBService.queryOne(query, values);
    }
    /**
     * Search patients by name
     */
    async searchByName(name) {
        const query = `
      SELECT * FROM ${this.tableName}
      WHERE LOWER(name) LIKE LOWER($1)
      ORDER BY name ASC
    `;
        return DBService.queryAll(query, [`%${name}%`]);
    }
    /**
     * Get patients within age range
     */
    async findByAgeRange(minAge, maxAge) {
        const query = `
      SELECT * FROM ${this.tableName}
      WHERE age BETWEEN $1 AND $2
      ORDER BY age ASC
    `;
        return DBService.queryAll(query, [minAge, maxAge]);
    }
    /**
     * Find patient by email
     */
    async findByEmail(email) {
        const query = `SELECT * FROM ${this.tableName} WHERE email = $1`;
        return DBService.queryOne(query, [email]);
    }
    /**
     * Get recent patients
     */
    async getRecent(limit = 10) {
        const query = `
      SELECT * FROM ${this.tableName}
      ORDER BY created_at DESC
      LIMIT $1
    `;
        return DBService.queryAll(query, [limit]);
    }
}
//# sourceMappingURL=PatientRepository.js.map