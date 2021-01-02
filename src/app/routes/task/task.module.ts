import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NgxAmapModule } from 'ngx-amap';
import { TaskListEditComponent } from './list/edit/edit.component';
import { TaskListComponent } from './list/list.component';
import { TaskRoutingModule } from './task-routing.module';

const COMPONENTS = [TaskListComponent, TaskListEditComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, TaskRoutingModule, NgxAmapModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class TaskModule {}
