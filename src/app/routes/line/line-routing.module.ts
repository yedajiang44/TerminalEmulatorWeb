import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineListAddComponent } from './add/add.component';
import { LineListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', component: LineListComponent, pathMatch: 'full' },
  { path: 'list', component: LineListComponent },
  { path: 'add', component: LineListAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineRoutingModule {}
