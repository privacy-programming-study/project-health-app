import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientRecordsPage } from './patient-records.page';

const routes: Routes = [
  {
    path: '',
    component: PatientRecordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRecordsPageRoutingModule {}
