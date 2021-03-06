import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {WizardModule} from './wizard/wizard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WizardModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
