import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard/dashboard.page';

import { UserPage } from './user.page';
import { AuthUserGuard } from '../login/auth-user/auth-user.guard';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canLoad: [AuthUserGuard]
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule),
        canLoad: [AuthUserGuard]
      },
      {
        path: 'appointments',
        loadChildren: () => import("./appointment/appointment.module").then(m => m.AppointmentPageModule),
        canLoad: [AuthUserGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
        canLoad: [AuthUserGuard]
      },
      {
        path: 'edit',
        loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule),
        canLoad: [AuthUserGuard]
      },
      {
        path: 'health-records',
        loadChildren: () => import('./health-records/health-records.module').then( m => m.HealthRecordsPageModule),
        canLoad: [AuthUserGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
