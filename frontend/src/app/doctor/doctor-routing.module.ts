import { DashboardPage } from './dashboard/dashboard.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorPage } from './doctor.page';
import { AuthDoctorGuard } from '../login/auth-doctor/auth-doctor.guard';

const routes: Routes = [
  {
    path: '',
    component: DoctorPage,
    children:[
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canLoad: [AuthDoctorGuard]
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule),
        canLoad: [AuthDoctorGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
        canLoad: [AuthDoctorGuard]
      },
      {
        path: 'edit',
        loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule),
        canLoad: [AuthDoctorGuard]
      },
      {
        path: 'patient-records',
        loadChildren: () => import('./patient-records/patient-records.module').then( m => m.PatientRecordsPageModule),
        canLoad: [AuthDoctorGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorPageRoutingModule {}
