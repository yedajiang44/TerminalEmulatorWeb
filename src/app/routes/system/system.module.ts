import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SystemConfigComponent } from './config/config.component';
import { SystemConfigEditComponent } from './config/edit/edit.component';
import { SystemConfigViewComponent } from './config/view/view.component';
import { SystemRoutingModule } from './system-routing.module';

const COMPONENTS = [SystemConfigComponent];
const COMPONENTS_NOROUNT = [SystemConfigEditComponent, SystemConfigViewComponent];

@NgModule({
  imports: [SharedModule, SystemRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class SystemModule {}
