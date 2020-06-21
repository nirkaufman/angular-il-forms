import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {WizardValidators} from './wizard-validators';

@Directive({
  selector: '[unique]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting: UniqueDirective,
    multi: true
  }]
})
export class UniqueDirective implements Validator {
  @Input('unique') collection : any[];

  validate(control: AbstractControl): ValidationErrors | null {
    return WizardValidators.unique(this.collection)(control);
  }
}
