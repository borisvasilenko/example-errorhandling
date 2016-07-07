import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'modal',
  template: `
  <div [style.display]="visible ? 'block' : 'none'" class="modal modal-scroll fade in">
    <div class="modal-dialog">
        <div class="modal-content">
            <ng-content></ng-content>
        </div>
    </div>
</div>
<div [style.display]="visible ? 'inherit' : 'none'" class="modal-backdrop fade in"></div>
  `
})
export class ModalComponent {
  @Input() public visible = false;
  @Output() public closed = new EventEmitter();

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;

    this.closed.emit(null);
  }
}