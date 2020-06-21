import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UniqueDirective } from './unique.directive';

@NgModule({
  declarations: [WizardComponent, UniqueDirective],
  exports: [WizardComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class WizardModule { }
