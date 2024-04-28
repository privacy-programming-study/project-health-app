import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthDoctorGuard } from './login/auth-doctor/auth-doctor.guard';
import { AuthUserGuard } from './login/auth-user/auth-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule),
  },
  {
    path: 'registrate',
    children: [
      {
        path:'doctor',
        loadChildren: () => import('./doctor/registrate/registrate.module').then( m => m.RegistratePageModule)
      },
      {
        path:'user',
        loadChildren: () => import('./user/registrate/registrate.module').then( m => m.RegistratePageModule)
      }
    ]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule),
    canLoad: [AuthUserGuard]
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorPageModule),
    canLoad: [AuthDoctorGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canLoad: [AuthUserGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
