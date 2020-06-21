import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {WizardValidators} from './wizard-validators';
import {combineLatest} from 'rxjs';

@Injectable()
export class WizardService {
  readonly wizardForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.wizardForm = formBuilder.group({
      yearOfBirth: [null, Validators.required],
      email: [null],
      childrenAge: formBuilder.array([]),
      password: [null, Validators.required],
      agree: [true],
    });

    this.registerUsernameUniquenessValidator();
    this.registerDisableValidator();
  }

  registerUsernameUniquenessValidator() {
    const emailControl = this.getControl('email');


    this.getControl('yearOfBirth').valueChanges
        .subscribe(year => {
          if (year > 1982) {
            emailControl.setValidators(WizardValidators.unique([year.toString()]));
          } else {
            emailControl.clearValidators();
          }
        });
  }

  registerDisableValidator() {
    combineLatest(
        this.getControl('yearOfBirth').statusChanges,
        this.getControl('email').statusChanges,
    ). subscribe( statuses => {
      const invalid = statuses.some( status => status === 'INVALID');

      if(invalid) {
        this.getControl('password').disable();
      } else {
        this.getControl('password').enable();
      }
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.wizardForm.get(controlName);
  }

  handleSubmit() {
    console.log(this.wizardForm.value);
  }
}
