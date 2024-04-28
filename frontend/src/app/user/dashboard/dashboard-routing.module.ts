import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { AuthUserGuard } from 'src/app/login/auth-user/auth-user.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('./../search/search.module').then(m => m.SearchPageModule),
        canLoad: [AuthUserGuard]
      },
      {
        path: 'appointments',
        loadChildren: () => import("./../appointment/appointment.module").then(m => m.AppointmentPageModule),
        canLoad: [AuthUserGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./../profile/profile.module').then( m => m.ProfilePageModule),
        canLoad: [AuthUserGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
