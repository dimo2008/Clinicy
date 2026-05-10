import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService, Patient } from '../patient';

@Component({
  selector: 'app-patient-edit',
  standalone: false,
  templateUrl: './patient-edit.html',
  styleUrl: './patient-edit.css',
})
export class PatientEdit implements OnInit {
  patient: Patient | null = null;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patient = patients.find(p => p.id === id) || null;
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.patient && this.patient.id) {
      this.patientService.updatePatient(this.patient.id, this.patient).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: (err) => console.error(err)
      });
    }
  }
}
