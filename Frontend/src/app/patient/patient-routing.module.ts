import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list.component';
import { PatientCreateComponent } from './patient-create.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: 'create', component: PatientCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }