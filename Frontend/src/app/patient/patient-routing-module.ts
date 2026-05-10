import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientList } from './patient-list/patient-list';
import { PatientCreate } from './patient-create/patient-create';
import { PatientEdit } from './patient-edit/patient-edit';

const routes: Routes = [
  { path: '', component: PatientList },
  { path: 'create', component: PatientCreate },
  { path: 'edit/:id', component: PatientEdit },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
