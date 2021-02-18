import { Component } from '@angular/core';

@Component({
  selector: 'layout-fullscreen',
  templateUrl: './fullscreen.component.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.alain-blank]': 'true',
  },
})
export class LayoutFullScreenComponent {}
