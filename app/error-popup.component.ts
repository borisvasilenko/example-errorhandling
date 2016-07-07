import { Component, EventEmitter, ChangeDetectorRef } from '@angular/core';

import * as Rx from 'rxjs/Rx';

import { ErrorService } from './error.service';
import { ModalComponent } from './shared/modal.component';
import { FeedbackComponent} from './shared/feedback.component';

@Component({
  selector: 'error-popup',
  template: `<modal [visible]="error">
    <div class="modal-body">
      <pre>{{ error?.message }}</pre>
    </div>
    <div class="modal-footer">
      <div class="pull-left">
        <button class="btn btn-primary" (click)="feedbackModal.open()">Send Report</button>
      </div>
      <button class="btn btm-default" (click)="close()">Close</button>
    </div>
  </modal>
  
  <modal #feedbackModal>
    <div class="modal-body">
      <feedback [initialData]="errorReport"
                (sent)="feedbackModal.close()"></feedback>
    </div>
  <modal>`,
  directives: [ModalComponent, FeedbackComponent]
})
export class ErrorPopupComponent {
  public visible = false;
  public error;
  public errorReport;

  private subscriptions = new Array<Rx.Subscription>();

  constructor(
    private errorService: ErrorService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.subscriptions.push(
      this.errorService.errors.subscribe(error => {
        this.error = error;
        this.errorReport = this.buildReport(error.message);

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

  private buildReport(error) {
    return {
      subject: "Error report",
      message: "An error has occurred",
      error: error
    };
  }
}