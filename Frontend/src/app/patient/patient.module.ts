import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientListComponent } from './patient-list.component';
import { PatientCreateComponent } from './patient-create.component';

@NgModule({
  declarations: [PatientListComponent, PatientCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }