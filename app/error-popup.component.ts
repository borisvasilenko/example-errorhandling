import { Component, EventEmitter, ChangeDetectorRef } from '@angular/core';

import * as Rx from 'rxjs/Rx';

import { ErrorService } from './error.service';
import { ModalComponent } from './shared/modal.component';

@Component({
  selector: 'error-popup',
  template: `<modal [visible]="error">
    <div class="modal-body">
      <pre>{{ error?.message }}</pre>
    </div>
    <div class="modal-footer">
      <button class="btn btm-default" (click)="close()">Close</button>
    </div>
  </modal>`,
  directives: [ModalComponent]
})
export class ErrorPopupComponent {
  public visible = false;
  public error;

  private subscriptions = new Array<Rx.Subscription>();

  constructor(
    private errorService: ErrorService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.subscriptions.push(
      this.errorService.errors.subscribe(error => {
        this.error = error;
        this.open();
        
        this.changeDetector.detectChanges();
      }));
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    if (this.error.reload) {
      window.location.replace(window.location.origin);
    }
  }
}