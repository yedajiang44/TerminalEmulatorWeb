import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListAddComponent } from './add/add.component';
import { TaskListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'list', component: TaskListComponent },
  { path: 'add', component: TaskListAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
