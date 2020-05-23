import { Component } from '@angular/core';
import { DarkmodeService } from './services/darkmode.service';
import { MatSliderChange } from '@angular/material/slider';


export interface DarkModeParams {
  mode: string;
  brightness: number;
  contrast: number;
  sepia: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularTestDarkmode';
  mode: string;
  brightness: number;
  contrast: number;
  sepia: number;
  params: DarkModeParams;

  constructor(
    public darkModeService: DarkmodeService
    ) {
    this.darkModeService.init();

    this.darkModeService.darkModeParamsObj.subscribe(params => {
      this.params = params as DarkModeParams;
      this.mode = params.mode;
      this.brightness = params.brightness;
      this.contrast = params.contrast;
      this.sepia = params.sepia;
    });
  }

  public setLightMode(): void {
    this.darkModeService.setLightMode();
  }

  public setDarkMode(): void {
    this.darkModeService.setDarkMode();
  }

  public reset() {
    this.darkModeService.reset();
  }

  public onBrightnessChange(event: MatSliderChange) {
     this.darkModeService.setBrightness(event.value);
  }

  public onContrastChange(event: MatSliderChange) {
    this.darkModeService.setContrast(event.value);
  }

  public onSepiaChange(event: MatSliderChange) {
    this.darkModeService.setSepia(event.value);
  }

  public toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }


}
