import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private validEmail = ['test2@test.test'];

  fakeHttp(value: string) {
    let someVal = of(this.validEmail.some((a)=>a===value)).pipe(delay(2000));
    return someVal;
  }
}
