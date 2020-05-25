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

  public updateParams(newParams: DarkModeParamaters) {
    localStorage.setItem('darkModeParams', JSON.stringify(newParams));
    this.darkModeParamsObjSubject.next(newParams);
  }

  public setLightMode() {
    disableDarkMode();
    const params = this.darkModeParamsObjSubject.getValue();
    params.darkmode = false;
    this.updateParams(params);
  }

  public setDarkMode() {
    const params = this.darkModeParamsObjSubject.getValue();
    params.darkmode = true;
    this.updateParams(params);
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
    if (localStorage.getItem('darkModeParams') === null || localStorage.getItem('darkModeParams') === undefined) {
      this.setLightMode();
    } else {
      this.updateParams(this.getLocalStorage());
      if (this.getMode()) {
        try {
          enableDarkMode({
            brightness: this.getBrightness(),
            contrast: this.getContrast(),
            sepia: this.getSepia(),
            grayscale: this.getGrayScale()
          });
        } catch (e) {
          console.log('IE11 is trash');
        }
      } else {
        this.setLightMode();
      }
    }
  }

  formatLabel(value: number) {
    return value + '%';
  }

  public getMode(): boolean {
    return this.getLocalStorage().darkmode;
  }

  public getBrightness(): number {
    return this.getLocalStorage().brightness;
  }

  public getContrast(): number {
    return this.getLocalStorage().contrast;
  }

  public getSepia(): number {
    return this.getLocalStorage().sepia;
  }

  public getGrayScale(): number {
    return this.getLocalStorage().grayscale;
  }

  public setBrightness(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.brightness = value;
    this.saveLocalStorage(params);
  }

  public setContrast(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.contrast = value;
    this.saveLocalStorage(params);
  }

  public setSepia(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.sepia = value;
    this.saveLocalStorage(params);
  }

  public setGrayScale(value: number): void {
    const params = this.darkModeParamsObjSubject.getValue();
    params.grayscale = value;
    this.saveLocalStorage(params);
  }

  saveLocalStorage(newParams) {
    localStorage.setItem('darkModeParams', JSON.stringify(newParams));
    this.darkModeParamsObjSubject.next(newParams);
    if (this.darkModeParamsObjSubject.getValue().darkmode) {
      this.setDarkMode();
    }
  }

  getLocalStorage(): DarkModeParamaters {
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

  public toggleDarkMode(): void {
    if (this.getMode()) {
      this.setLightMode();
    } else {
      this.setDarkMode();
    }
  }

  public isCrappyBrowser() {
    if ((document as any).documentMode || /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent)) {
     return true;
  }
    return false;
  }

}
