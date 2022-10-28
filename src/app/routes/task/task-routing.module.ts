import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenchmarkListComponent } from './benchmark/list.component';
import { TaskListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'list', component: TaskListComponent },
  { path: 'benchmark', component: BenchmarkListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule {}
