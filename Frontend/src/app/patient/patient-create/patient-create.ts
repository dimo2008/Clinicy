import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService, Patient } from '../patient';

@Component({
  selector: 'app-patient-create',
  standalone: false,
  templateUrl: './patient-create.html',
  styleUrl: './patient-create.css',
})
export class PatientCreate {
  patient: Patient = { name: '', age: 0 };

  constructor(private patientService: PatientService, private router: Router) {}

  onSubmit(): void {
    this.patientService.createPatient(this.patient).subscribe({
      next: () => this.router.navigate(['/patients']),
      error: (err) => console.error(err)
    });
  }
}
