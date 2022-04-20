import { EmailService } from './email.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, debounce } from 'rxjs/operators';

export class AsyncValidatorService {

  static createValidator(emailService: EmailService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return emailService.fakeHttp(control.value).pipe(
        map((result: boolean) => (result ? { invalidAsync: true } : null) as ValidationErrors)
      );
    };
  }

}
