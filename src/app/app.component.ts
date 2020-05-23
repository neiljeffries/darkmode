import { Component } from '@angular/core';
import { DarkmodeService } from './services/darkmode.service';
import { MatSliderChange } from '@angular/material/slider';
import { DarkModeParamaters } from './interfaces/dark-mode-paramaters';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DarkModeAngular';
  mode: boolean;
  brightness: number;
  contrast: number;
  sepia: number;
  grayscale: number;
  params: DarkModeParamaters;

  constructor(
    public darkModeService: DarkmodeService
    ) {
    this.darkModeService.init();

    this.darkModeService.darkModeParamsObj.subscribe(params => {
      this.params = params as DarkModeParamaters;
      this.mode = params.mode;
      this.brightness = params.brightness;
      this.contrast = params.contrast;
      this.sepia = params.sepia;
      this.grayscale = params.grayscale;
    });
  }

  public setLightMode(): void {
    this.darkModeService.setLightMode();
  }

  public setDarkMode(): void {
    this.darkModeService.setDarkMode();
  }

  public reset(): void {
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
  public onGrayScaleChange(event: MatSliderChange) {
    this.darkModeService.setGrayScale(event.value);
  }

  public toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }


}
