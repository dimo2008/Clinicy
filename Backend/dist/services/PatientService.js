import { PatientRepository } from '../repositories/PatientRepository.js';
export class PatientService {
    static patientRepository = new PatientRepository();
    static async getAllPatients() {
        return this.patientRepository.findAll();
    }
    static async getRecentPatients(limit = 10) {
        return this.patientRepository.getRecent(limit);
    }
    static async createPatient(data) {
        return this.patientRepository.create(data);
    }
    static async getPatientById(id) {
        return this.patientRepository.findById(id);
    }
    static async updatePatient(id, data) {
        return this.patientRepository.update(id, data);
    }
    static async deletePatient(id) {
        return this.patientRepository.deleteById(id);
    }
    static async searchPatients(name) {
        return this.patientRepository.searchByName(name);
    }
    static async getPatientsByAgeRange(minAge, maxAge) {
        return this.patientRepository.findByAgeRange(minAge, maxAge);
    }
    static async getPatientByEmail(email) {
        return this.patientRepository.findByEmail(email);
    }
    static async getPatientCount() {
        return this.patientRepository.count();
    }
}
//# sourceMappingURL=PatientService.js.map