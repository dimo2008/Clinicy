import { Component, OnInit } from '@angular/core';
import { PatientService, Patient } from './patient.service';

@Component({
  selector: 'app-patient-list',
  standalone: false,
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAll().subscribe(patients => this.patients = patients);
  }

  delete(id: number): void {
    this.patientService.delete(id).subscribe(() => this.loadPatients());
  }

}