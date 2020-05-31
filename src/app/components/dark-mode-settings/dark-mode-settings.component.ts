import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MatSlideToggleChange, MAT_DIALOG_DATA } from '@angular/material';
import { MatSliderChange } from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { SlideInOutAnimation } from 'src/app/interfaces/animations';
import { DarkModeParamaters } from 'src/app/interfaces/dark-mode-paramaters';
import { DarkmodeService } from 'src/app/services/darkmode.service';

@Component({
  selector: 'app-dark-mode-settings',
  templateUrl: './dark-mode-settings.component.html',
  styleUrls: ['./dark-mode-settings.component.css'],
  animations: [SlideInOutAnimation]
})
export class DarkModeSettingsComponent implements OnDestroy {
  private readonly matDialogRef: MatDialogRef<DarkModeSettingsComponent>;
  params: DarkModeParamaters;
  isIE: boolean =  this.darkModeService.isCrappyBrowser();
  paramsSubscription: Subscription;
  saveResp: string;
  animationState: string;

  constructor(
    matDialogRef: MatDialogRef<DarkModeSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef },
    public darkModeService: DarkmodeService,
    public dialModalRef: MatDialogRef<any>
  ) {
    this.matDialogRef = matDialogRef;

    this.paramsSubscription = this.darkModeService.darkModeParamsObj.subscribe(
      (paramaters: DarkModeParamaters) => {
        this.params = paramaters;
        this.animationState = this.params.darkmode ? 'in' : 'out';
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  public cancel(): void {
    this.dialModalRef.close();
    this.darkModeService.cancel();
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
    if (this.saveResp === 'Saved!') {
      setTimeout(() => this.matDialogRef.close(), 500);
    }
  }
}
