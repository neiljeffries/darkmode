import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/constants';
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
  params: DarkModeParamaters;
  isUnsupportedBrowser: boolean =  this.darkModeService.isUnsupportedBrowser();
  paramsSubscription: Subscription;
  saveResp: string;
  animationState: string;

  constructor(
    private matDialogRef: MatDialogRef<DarkModeSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data: {},
    public darkModeService: DarkmodeService,
  ) {
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
    this.matDialogRef.close();
    this.darkModeService.initializeDarkMode();
  }

  public save(): void {
    if ( this.darkModeService.saveLocalStorage( constants.DARKMODE_LOCAL_STORAGE_KEY, this.params ) ) {
      this.saveResp = 'Saved!';
      setTimeout( () => this.matDialogRef.close(), 500 );
    } else {
      this.saveResp = 'Uh Oh! Not Saved!';
    }
  }
}
