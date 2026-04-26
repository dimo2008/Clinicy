import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-patient-create',
  standalone: false,
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: '',
      age: '',
      email: '',
      phone: ''
    });
  }

  onSubmit(): void {
    this.patientService.create(this.form.value).subscribe(() => {
      this.router.navigate(['/patients']);
    });
  }

}