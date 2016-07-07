import {Injectable, bind, ExceptionHandler, ChangeDetectorRef} from "@angular/core";
import * as Rx from "rxjs/Rx";

@Injectable()
export class ConsoleLogger {
  log(s: any): void { console.log(s); }
  logError(s: any): void { console.error(s); }
  logGroup(s: any): void { console.log(s); }
  logGroupEnd() {};
}

@Injectable()
export class ErrorService {
    private _errors: Rx.Subject<ErrorInfo> = new Rx.Subject<ErrorInfo>();

    public constructor(private _logger: ConsoleLogger) {}

    public get errors(): Rx.Observable<ErrorInfo> {
        return this._errors;
    }

    public showError(message, reload = false, log = true) {
        this._errors.next({ message, reload });

        if (log) {
            this._logger.logError(message);
        }
    }

    public showErrorAndReload(message, log = true) {
        this.showError(message, true, log);
    }
}

export interface ErrorInfo {
    message: string;
    reload: boolean;
}

@Injectable()
class MyExceptionHandler extends ExceptionHandler {
    constructor(
        consoleLogger: ConsoleLogger,
        private errorService: ErrorService
    ) {
        super(consoleLogger, false);
    }

    call(error, stackTrace = null, reason = null) {
        super.call(error, stackTrace, reason);

        this.errorService.showErrorAndReload(stackTrace || error, false);
    }
}

export var errorServiceInjectables: Array<any> = [
  bind(ErrorService).toClass(ErrorService),
  bind(ConsoleLogger).toClass(ConsoleLogger),
  bind(ExceptionHandler).toClass(MyExceptionHandler)
];
