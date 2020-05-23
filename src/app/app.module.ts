import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DarkModeSettingsComponent } from './components/dark-mode-settings/dark-mode-settings.component';
import { DarkmodeService } from './services/darkmode.service';

@NgModule({
  declarations: [
    AppComponent,
    DarkModeSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [DarkModeSettingsComponent],
  providers: [DarkmodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
