import { promises as fsPromises } from 'fs';

interface Patient {
  id: number;
  name: string;
  age: number;
}

const patientsFile = 'Files/patients.txt';

export class PatientService {
  static async readPatients(): Promise<Patient[]> {
    try {
      const data = await fsPromises.readFile(patientsFile, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static async writePatients(patients: Patient[]): Promise<void> {
    await fsPromises.writeFile(patientsFile, JSON.stringify(patients, null, 2));
  }

  static async getAllPatients(): Promise<Patient[]> {
    return await this.readPatients();
  }

  static async createPatient(data: Omit<Patient, 'id'>): Promise<Patient> {
    const patients = await this.readPatients();
    const nextId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    const patient: Patient = { id: nextId, ...data };
    patients.push(patient);
    await this.writePatients(patients);
    return patient;
  }

  static async updatePatient(id: number, data: Partial<Patient>): Promise<Patient | null> {
    const patients = await this.readPatients();
    const index = patients.findIndex(p => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...data } as Patient;
      await this.writePatients(patients);
      return patients[index];
    }
    return null;
  }

  static async deletePatient(id: number): Promise<boolean> {
    const patients = await this.readPatients();
    const index = patients.findIndex(p => p.id === id);
    if (index !== -1) {
      patients.splice(index, 1);
      await this.writePatients(patients);
      return true;
    }
    return false;
  }
}