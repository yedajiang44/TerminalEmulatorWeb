import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemConfigComponent } from './config/config.component';
import { SystemConfigViewComponent } from './config/view/view.component';

const routes: Routes = [
  {
    path: 'config',
    component: SystemConfigComponent,
    children: [
      {
        path: 'view',
        component: SystemConfigViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
