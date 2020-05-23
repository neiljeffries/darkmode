import { Component, OnInit } from '@angular/core';

import { MatSliderChange } from '@angular/material/slider';
import { DarkmodeService } from 'src/app/services/darkmode.service';
import { DarkModeParamaters } from 'src/app/interfaces/dark-mode-paramaters';


@Component({
  selector: 'app-dark-mode-settings',
  templateUrl: './dark-mode-settings.component.html',
  styleUrls: ['./dark-mode-settings.component.css']
})

export class DarkModeSettingsComponent {


  darkmode: boolean;
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
      this.darkmode = params.darkmode;
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
