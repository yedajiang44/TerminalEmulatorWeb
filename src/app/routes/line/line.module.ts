import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NgxAmapModule } from 'ngx-amap';
import { LineListAddComponent } from './add/add.component';
import { LineConfigComponent } from './config/config.component';
import { LineRoutingModule } from './line-routing.module';
import { LineListComponent } from './list/list.component';

const COMPONENTS = [LineListAddComponent, LineListComponent];
const COMPONENTS_NOROUNT = [LineConfigComponent];

@NgModule({
  imports: [SharedModule, LineRoutingModule, NgxAmapModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class LineModule {}
