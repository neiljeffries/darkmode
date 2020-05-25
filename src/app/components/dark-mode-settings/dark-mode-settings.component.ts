import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSliderChange } from '@angular/material/slider';
import { DarkModeParamaters } from 'src/app/interfaces/dark-mode-paramaters';
import { DarkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-dark-mode-settings',
  templateUrl: './dark-mode-settings.component.html',
  styleUrls: ['./dark-mode-settings.component.css']
})

export class DarkModeSettingsComponent implements OnInit {
  private readonly matDialogRef: MatDialogRef<DarkModeSettingsComponent>;
  private readonly triggerElementRef: ElementRef;

  params: DarkModeParamaters;
  isIE: boolean;

  constructor(
    matDialogRef: MatDialogRef<DarkModeSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef },
    public darkModeService: DarkmodeService,
    public dialModalRef: MatDialogRef<any>
    ) {
      this.matDialogRef = matDialogRef;
      this.triggerElementRef = data.trigger;

      this.darkModeService.darkModeParamsObj.subscribe(params => {
        this.params = params as DarkModeParamaters;
      });

      this.isIE = this.darkModeService.isCrappyBrowser();
  }

  ngOnInit() {
    this.configureMatDialog();
  }

  configureMatDialog() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left - 270 }px`, top: `${rect.bottom - 30}px` };
    this.matDialogRef.updatePosition(matDialogConfig.position);
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
