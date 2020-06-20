import { Injectable } from '@angular/core';
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../constants';
import { DarkModeParamaters } from '../interfaces/dark-mode-paramaters';


@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  constructor() {}

  private darkModeParamsObjSubject = new BehaviorSubject<DarkModeParamaters>( constants.DEFAULTS );
  darkModeParamsObj = this.darkModeParamsObjSubject.asObservable();

  public setDarkMode(enabled: boolean): void {
    const params: DarkModeParamaters = this.darkModeParamsObjSubject.getValue();
    params.darkmode = enabled;
    if (enabled) {
      enableDarkMode(params);
    } else {
      disableDarkMode();
    }
    this.darkModeParamsObjSubject.next(params);
  }

  public initializeDarkMode(): void {
    if ( !localStorage.hasOwnProperty( constants.DARKMODE_LOCAL_STORAGE_KEY ) ) {
      this.setDarkMode( false );
    } else {
      const params: DarkModeParamaters = this.getLocalStorage( constants.DARKMODE_LOCAL_STORAGE_KEY );
      this.darkModeParamsObjSubject.next( params );
      if ( params.darkmode ) {
        enableDarkMode( params );
      } else {
        this.setDarkMode( false );
      }
    }
  }

  formatLabel(value: number) {
    return value.toString().concat('%');
  }

  public adjustValue(type: string, value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params[type] = value;
    this.darkModeParamsObjSubject.next(params);
    enableDarkMode(params);
  }

  public saveLocalStorage(key: string, value: any): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public getLocalStorage(key: string): any {
    if (localStorage.hasOwnProperty(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  public isUnsupportedBrowser(): boolean {
    /** The below code permits Edge Chromium and all other browsers except Edge and IE. */
    if ((
      (document as any).documentMode // <-- this line tests for IE
      || constants.isEdge)
      && !constants.isEdgeChromium ) {
      return true;
    }
    return false;
  }
}
