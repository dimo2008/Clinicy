import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PatientRoutingModule } from './patient-routing-module';
import { PatientList } from './patient-list/patient-list';
import { PatientCreate } from './patient-create/patient-create';
import { PatientEdit } from './patient-edit/patient-edit';
import { Navbar } from './navbar/navbar';

@NgModule({
  declarations: [PatientList, PatientCreate, PatientEdit, Navbar],
  imports: [CommonModule, PatientRoutingModule, FormsModule, RouterModule],
})
export class PatientModule {}
