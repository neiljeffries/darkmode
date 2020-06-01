import { Injectable } from '@angular/core';
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader';
import { BehaviorSubject } from 'rxjs';
import { DarkModeParamaters } from '../interfaces/dark-mode-paramaters';

const LOCAL_STORAGE_KEY = 'darkModeParams';
const defaults: DarkModeParamaters = {
  darkmode: false,
  brightness: 150,
  contrast: 96,
  sepia: 0,
  grayscale: 0,
};

@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  constructor() {}

  private darkModeParamsObjSubject = new BehaviorSubject<DarkModeParamaters>(defaults);
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

  public init(): void {
    if (!localStorage.hasOwnProperty(LOCAL_STORAGE_KEY)) {
      this.setDarkMode(false);
    } else {
      const params: DarkModeParamaters = this.getLocalStorage();
      this.darkModeParamsObjSubject.next(params);
      if (params.darkmode) {
        enableDarkMode(params);
      } else {
        this.setDarkMode(false);
      }
    }
  }

  formatLabel(value: number) {
    return value + '%';
  }

  public adjustValue(type: string, value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params[type] = value;
    this.darkModeParamsObjSubject.next(params);
    enableDarkMode(params);
  }

  public saveSubjectToLocalStorage(): string {
    const params = this.darkModeParamsObjSubject.getValue();
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(params));
      return 'Saved!';
    } catch (e) {
      return 'Save Failed!';
    }
  }

  public getLocalStorage(): DarkModeParamaters {
    const params: string = localStorage.getItem(LOCAL_STORAGE_KEY);
    const paramsParsed: DarkModeParamaters = JSON.parse(params);
    return paramsParsed;
  }

  public toggleDarkMode(checked: boolean): void {
    if (checked) {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }

  public isCrappyBrowser(): boolean {
    if (
      (document as any).documentMode ||
      /Edge/.test(navigator.userAgent) ||
      /Edg/.test(navigator.userAgent)
    ) {
      return true;
    }
    return false;
  }
}
