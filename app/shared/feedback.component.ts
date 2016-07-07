import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as Rx from 'rxjs/Rx';

import { ModalComponent } from './modal.component';

@Component({
  selector: 'feedback',
  template: `
  <form #form="ngForm" (ngSubmit)="send(form.value)" class="feedback">
    <div class="form-group">
        <label for="subject" class="h4">Subject</label>
        <input type="text"
               class="form-control"
               id="subject"
               name="subject"
               placeholder="Enter subject"
               [ngModel]="initialData?.subject"
               required>
    </div>
    <div class="form-group">
        <label for="message" class="h4">Message</label>
        <textarea id="message"
                  class="form-control"
                  rows="5"
                  name="message"
                  placeholder="Enter your message"
                  [ngModel]="initialData?.message"
                  required></textarea>

    </div>
    <div *ngIf="initialData?.error" class="form-group">
        <label for="errorData" class="h4">Error Details</label>
        <textarea id="errorData"
                  class="form-control"
                  rows="2"
                  name="error"
                  [ngModel]="initialData?.error"
                  readonly></textarea>

    </div>
    <div class="form-group">
        <button id="send" type="submit" class="btn btn-warning" [disabled]="sending">
            Send
            <span class="glyphicon glyphicon-send"></span>
        </button>
        <span *ngIf="sending" class="status">
            Processing your request
        </span>
    </div>
</form>

<modal #success [visible]="successMessage" (closed)="closeSuccessMessage()">
    <div class="modal-body feedback-success">
        We have received your feedback.
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" (click)="success.close()">Close</button>
    </div>
</modal>

<modal #failure [visible]="failureMessage">
    <div class="modal-body feedback-fail">
        Could not complete the request
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" (click)="failure.close()">Close</button>
    </div>
</modal>`,
directives: [ModalComponent]
})
export class FeedbackComponent {
  public sending = false;
  public successMessage = false;
  public failureMessage = false;

  @Input() public initialData;
  @Output() public sent = new EventEmitter();

  public constructor() {}

  public send(input) {
      this.sendFeedback(input)
          .then(() => {
              this.sending = false;
              this.successMessage = true;
          })
          .catch(err => {
              this.sending = false;
              this.failureMessage = true;
          });

      this.sending = true;
      this.successMessage = false;
      this.failureMessage = false;
  }

  public sendFeedback(input) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log('FEEDBACK SENT: ', input)
        resolve();
      }, 300);
    });
  }

  public closeSuccessMessage() {
      this.sent.emit(null);
  }
}