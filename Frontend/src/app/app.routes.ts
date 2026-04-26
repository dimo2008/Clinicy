import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'patients', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },
];
