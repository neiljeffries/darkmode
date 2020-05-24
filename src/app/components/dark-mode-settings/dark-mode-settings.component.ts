import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatSliderChange } from '@angular/material/slider';
import { DarkModeParamaters } from 'src/app/interfaces/dark-mode-paramaters';
import { DarkmodeService } from 'src/app/services/darkmode.service';


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
  isIE: boolean;

  constructor(
    public darkModeService: DarkmodeService, public dialModalRef: MatDialogRef<any>
    ) {


    this.darkModeService.darkModeParamsObj.subscribe(params => {
      this.params = params as DarkModeParamaters;
      this.darkmode = params.darkmode;
      this.brightness = params.brightness;
      this.contrast = params.contrast;
      this.sepia = params.sepia;
      this.grayscale = params.grayscale;
    });
    this.isIE = this.darkModeService.isCrappyBrowser();
  //  this.changePosition();
  }
//   changePosition() {
//     console.log('suhfkjsdhfksfhksdhfjksd');
//     this.dialModalRef.updatePosition({ top: '50px', left: '50px' });
// }
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
