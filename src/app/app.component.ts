import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EmailService } from './email.service';
import { AsyncValidatorService } from './async-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public sent: boolean = false;
  constructor(private fb: FormBuilder, private emailService: EmailService, private readonly _cd: ChangeDetectorRef) {
  }
  data: {} = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };
  emailRegExp = '(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))';

  versionArr: string[] = [];

  profileForm = this.fb.group({
    firstName: ['', [Validators.min(3), Validators.required]],
    lastName: ['', [Validators.min(2), Validators.required]],
    dateOfBirth: ['', [Validators.required]],
    framework: ['', [Validators.required]],
    frameworkVersion: [{ value: '', disabled: true }, [Validators.required]],
    email: ['', [Validators.pattern(this.emailRegExp), Validators.required], [AsyncValidatorService.createValidator(this.emailService)]],
    hobby: this.fb.array([], [Validators.required, Validators.minLength(1)])
  })

  addHobby(event:any): void {
    event.preventDefault();
    const hobby = this.fb.group({
      name: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });

    (this.profileForm.controls['hobby'] as FormArray).push(hobby);
  }
  public get hobies() {
    return this.profileForm.controls['hobby'] as FormArray;
  }
  public getHobby(i: number): FormGroup {
    return (this.profileForm.controls['hobby'] as FormArray).controls[i] as FormGroup;
  }

  convertDate(date: any) {
    let newDate: string;
    let mouth = String(date.getDay()+1);
    let day = String(date.getDate());
    let year = String(date.getFullYear());
    return newDate = day + '-' + mouth + '-' + year;

  }

  onSubmit(form: FormGroup) {
    this.sent = true;
    if (form.invalid) return;
    form.value.dateOfBirth = this.convertDate(form.value.dateOfBirth);
    form.value.framework = form.value.framework.key;
    console.log(form.value);
    
  }

  getValue(val: []) {
    this.versionArr = val;
    this.profileForm.controls['frameworkVersion'].enable();
    
  }


  ngOnInit() {
    this.profileForm.controls['email'].statusChanges.subscribe(() => this._cd.markForCheck());
  };
}
