import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MatSlideToggleChange, MAT_DIALOG_DATA } from '@angular/material';
import { MatSliderChange } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { DarkModeParamaters } from 'src/app/interfaces/dark-mode-paramaters';
import { DarkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-dark-mode-settings',
  templateUrl: './dark-mode-settings.component.html',
  styleUrls: ['./dark-mode-settings.component.css']
})

export class DarkModeSettingsComponent implements OnInit, OnDestroy {
  private readonly matDialogRef: MatDialogRef<DarkModeSettingsComponent>;
  private readonly triggerElementRef: ElementRef;

  params: DarkModeParamaters;
  isIE: boolean;
  paramsSubscription: Subscription;
  saveResp: string;

  constructor(
    matDialogRef: MatDialogRef<DarkModeSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef },
    public darkModeService: DarkmodeService,
    public dialModalRef: MatDialogRef<any>
    ) {
      this.matDialogRef = matDialogRef;
      this.triggerElementRef = data.trigger;

      this.paramsSubscription = this.darkModeService.darkModeParamsObj.subscribe(params => {
        this.params = params as DarkModeParamaters;
      });

      this.isIE = this.darkModeService.isCrappyBrowser();
  }

  ngOnInit() {
    this.configureMatDialog();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  public configureMatDialog(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left - 270 }px`, top: `${rect.bottom - 30}px` };
    this.matDialogRef.updatePosition(matDialogConfig.position);
  }

  public reset(): void {
    this.darkModeService.reset();
  }

  public onBrightnessChange(event: MatSliderChange): void {
     this.darkModeService.setBrightness(event.value);
  }

  public onContrastChange(event: MatSliderChange): void {
    this.darkModeService.setContrast(event.value);
  }

  public onSepiaChange(event: MatSliderChange): void {
    this.darkModeService.setSepia(event.value);
  }
  public onGrayScaleChange(event: MatSliderChange): void {
    this.darkModeService.setGrayScale(event.value);
  }

  public toggleDarkMode(event: MatSlideToggleChange): void {
    this.darkModeService.toggleDarkMode(event.checked);
  }

  public save(): void {
    this.saveResp = this.darkModeService.saveSubjectToLocalStorage();
    if ( this.saveResp === 'Saved!' ) {
      setTimeout(() => this.matDialogRef.close(), 500);
    }
  }
}
