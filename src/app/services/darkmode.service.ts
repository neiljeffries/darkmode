import { Injectable } from '@angular/core';
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader';
import { BehaviorSubject } from 'rxjs';
import { DarkModeParamaters } from '../interfaces/dark-mode-paramaters';

const defaults: DarkModeParamaters = {
  darkmode: false,
  brightness: 150,
  contrast: 96,
  sepia: 0,
  grayscale: 0
};

@Injectable({
  providedIn: 'root',
})

export class DarkmodeService {
  constructor() {}

  private darkModeParamsObjSubject = new BehaviorSubject<DarkModeParamaters>(defaults);
  darkModeParamsObj = this.darkModeParamsObjSubject.asObservable();

   public turnDarkModeOff(): void {
    disableDarkMode();
    const params: DarkModeParamaters = this.darkModeParamsObjSubject.getValue();
    params.darkmode = false;
    this.darkModeParamsObjSubject.next(params);
  }

  public setDarkMode(): void {
    const params: DarkModeParamaters = this.darkModeParamsObjSubject.getValue();
    params.darkmode = true;
    this.darkModeParamsObjSubject.next(params);
    try {
      enableDarkMode({
        brightness: params.brightness,
        contrast: params.contrast,
        sepia: params.sepia,
        grayscale: params.grayscale
      });
    } catch (e) {
      console.log('IE11 is trash');
    }
  }

  public init(): void {
    if (!localStorage.hasOwnProperty('darkModeParams')) {
      this.turnDarkModeOff();
    } else {
      const params: DarkModeParamaters = this.getLocalStorage();
      this.darkModeParamsObjSubject.next(params);
      if (params.darkmode) {
        try {
          enableDarkMode({
            brightness: params.brightness,
            contrast: params.contrast,
            sepia: params.sepia,
            grayscale: params.grayscale
          });
        } catch (e) {
          console.log('IE11 is trash');
        }
      } else {
        this.turnDarkModeOff();
      }
    }
  }

  formatLabel(value: number) {
    return value + '%';
  }

  public setBrightness(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.brightness = value;
    this.darkModeParamsObjSubject.next(params);
    this.setDarkMode();
  }

  public setContrast(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.contrast = value;
    this.darkModeParamsObjSubject.next(params);
    this.setDarkMode();
  }

  public setSepia(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.sepia = value;
    this.darkModeParamsObjSubject.next(params);
    this.setDarkMode();
  }

  public setGrayScale(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.grayscale = value;
    this.darkModeParamsObjSubject.next(params);
    this.setDarkMode();
  }

  public saveSubjectToLocalStorage(): string {
    const params = this.darkModeParamsObjSubject.getValue();
    try {
      localStorage.setItem('darkModeParams', JSON.stringify(params));
      return 'Saved!';
    } catch (e) {
      return 'Save Failed!';
    }
  }

  public getLocalStorage(): DarkModeParamaters {
    const params: string = localStorage.getItem('darkModeParams');
    const paramsParsed: DarkModeParamaters = JSON.parse(params);
    return paramsParsed;
  }

  public reset(): void {
    this.setBrightness(150);
    this.setContrast(96);
    this.setSepia(0);
    this.setGrayScale(0);
    this.setDarkMode();
  }

  public toggleDarkMode(checked: boolean): void {
    if (checked) {
      this.setDarkMode();
    } else {
      this.turnDarkModeOff();
     }
  }

  public isCrappyBrowser(): boolean {
    if ((document as any).documentMode || /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent)) {
     return true;
  }
    return false;
  }

}
