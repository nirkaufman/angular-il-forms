import {Component, OnInit} from '@angular/core';
import {WizardService} from './wizard.service';
import {FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-wizard',
  template: `
      <form [formGroup]="wizardService.wizardForm"
            (ngSubmit)="wizardService.handleSubmit()">

          <div class="form-group">
              <label for="exampleInputEmail1">Year of Birth</label>
              <input type="number"
                     class="form-control"
                     [unique]="[2050]"
                     [ngClass]="getValidationCssClass('yearOfBirth')"
                     formControlName="yearOfBirth">
          </div>

          <button (click)="addChild()" class="btn btn-primary">add child</button>

          <ng-container *ngFor="let child of children; index as i">
              <div class="form-group">
                  <input type="number" [formControl]="$any(children[i])">
              </div>
          </ng-container>

          <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email"
                     class="form-control"
                     [ngClass]="getValidationCssClass('email')"
                     formControlName="email">
              <pre>{{ this.wizardService.getControl('email').errors | json }}</pre>
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password"
                     class="form-control"
                     [unique]="['nir','joe']"
                     [ngClass]="getValidationCssClass('password')"
                     formControlName="password">
              <pre>{{ this.wizardService.getControl('password').errors | json }}</pre>
          </div>
          <div class="form-group form-check">
              <input type="checkbox"
                     class="form-check-input"
                     formControlName="agree">
              <label class="form-check-label"
              >Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
      </form>
  `,
  providers: [WizardService]
})
export class WizardComponent implements OnInit {
  wizardService: WizardService;

  constructor(wizardService: WizardService) {
    this.wizardService = wizardService;
  }

  ngOnInit(): void {
  }

  get children(){
    const childArray = this.wizardService.getControl('childrenAge') as FormArray;
    return childArray.controls;
  }

  getValidationCssClass(controlName: string) {
    const control = this.wizardService.wizardForm.get(controlName);

    return {
      'is-valid': control?.touched && control.valid,
      'is-invalid': control?.touched && control.invalid,
    };
  }

  addChild() {
    const childArray = this.wizardService.getControl('childrenAge') as FormArray;
    childArray.push(new FormControl())
  }
}
