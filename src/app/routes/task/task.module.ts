import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NgxAmapModule } from 'ngx-amap';
import { NgxEchartsModule } from 'ngx-echarts';
import { BenchmarkEditComponent } from './benchmark/edit/edit.component';
import { BenchmarkListComponent } from './benchmark/list.component';
import { TaskListEditComponent } from './list/edit/edit.component';
import { TaskListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { MonitorChartComponent } from './monitor/chart.component';
import { TaskRoutingModule } from './task-routing.module';

const COMPONENTS = [
  TaskListComponent,
  TaskListEditComponent,
  BenchmarkListComponent,
  BenchmarkEditComponent,
  MonitorChartComponent,
  MapComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    TaskRoutingModule,
    NgxAmapModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class TaskModule {}
