import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService, Patient } from '../patient';

@Component({
  selector: 'app-patient-list',
  standalone: false,
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (data) => this.patients = data,
      error: (err) => console.error(err)
    });
  }

  deletePatient(id: number | undefined): void {
    if (id && confirm('Are you sure?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => this.loadPatients(),
        error: (err) => console.error(err)
      });
    }
  }
}
