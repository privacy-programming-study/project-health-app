import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthRecordsPage } from './health-records.page';

const routes: Routes = [
  {
    path: '',
    component: HealthRecordsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthRecordsPageRoutingModule {}
