import { Injectable } from '@angular/core';
import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader';
import { BehaviorSubject } from 'rxjs';

export interface DarkModeParams {
  mode: string;
  brightness: number;
  contrast: number;
  sepia: number;
}

const defaults: DarkModeParams = {
  mode: 'off',
  brightness: 100,
  contrast: 90,
  sepia: 10
};

@Injectable({
  providedIn: 'root',
})

export class DarkmodeService {
  constructor() {}

  private darkModeParamsObjSubject = new BehaviorSubject<DarkModeParams>(defaults);
  darkModeParamsObj = this.darkModeParamsObjSubject.asObservable();

  public updateParams(mode: string, brightness: number, contrast: number, sepia: number) {
    const currentParams = this.darkModeParamsObjSubject.getValue();
    const newParams: DarkModeParams = currentParams;
    newParams.mode = mode;
    newParams.brightness = brightness;
    newParams.contrast = contrast;
    newParams.sepia = sepia;
    localStorage.setItem('darkModeParams', JSON.stringify(newParams));
    this.darkModeParamsObjSubject.next(newParams);
  }

  public setLightMode() {
    disableDarkMode();
    const params = this.darkModeParamsObjSubject.getValue();
    this.updateParams('off', params.brightness, params.contrast, params.sepia);
  }

  public setDarkMode() {
    const params = this.darkModeParamsObjSubject.getValue();
    this.updateParams('on', params.brightness, params.contrast, params.sepia);
    try {
      enableDarkMode({
        brightness: this.darkModeParamsObjSubject.getValue().brightness,
        contrast: this.darkModeParamsObjSubject.getValue().contrast,
        sepia: this.darkModeParamsObjSubject.getValue().sepia
      });
    } catch (e) {
      console.log('IE11 is trash');
    }
  }

  public init(): void {
    if (localStorage.getItem('darkModeParams') === null || localStorage.getItem('darkModeParams') === undefined) {
      this.setLightMode();
    } else {
      this.updateParams(this.getMode(), this.getBrightness(), this.getContrast(), this.getSepia());
      if (this.getMode() === 'on') {
        try {
          enableDarkMode({
            brightness: this.getBrightness(),
            contrast: this.getContrast(),
            sepia: this.getSepia()
          });
        } catch (e) {
          console.log('IE11 is trash');
        }
      } else {
        this.setLightMode();
      }
    }
  }

  public getMode(): string {
    return this.getLocalStorage().mode;
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

  saveLocalStorage(newParams) {
    localStorage.setItem('darkModeParams', JSON.stringify(newParams));
    this.darkModeParamsObjSubject.next(newParams);
    if (this.darkModeParamsObjSubject.getValue().mode === 'on') {
      this.setDarkMode();
    }
  }

  getLocalStorage(): DarkModeParams {
    const params: string = localStorage.getItem('darkModeParams');
    const paramsParsed: DarkModeParams = JSON.parse(params);
    return paramsParsed;
  }

  public reset(): void {
    this.setBrightness(100);
    this.setContrast(90);
    this.setSepia(10);
    this.setDarkMode();
  }

  public toggleDarkMode(): void {
    if (this.getMode() === 'on') {
      this.setLightMode();
    } else {
      this.setDarkMode();
    }
  }

}
