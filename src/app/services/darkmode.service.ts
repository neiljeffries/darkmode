import { Injectable } from '@angular/core';
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from 'darkreader';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DarkmodeService {
  constructor() {}

  private modeSubject = new BehaviorSubject<string>('');
  mode = this.modeSubject.asObservable();

  public setLightMode() {
    disableDarkMode();
    this.save('off');
  }

  public setDarkMode() {
    enableDarkMode({
      brightness: 100,
      contrast: 90,
      sepia: 10,
    });
    this.save('on');
  }

  public save(mode: string) {
    localStorage.setItem('darkmode', JSON.stringify(mode));
    this.modeSubject.next(mode);
  }

  public init() {
    if (localStorage.getItem('darkmode') === null) {
      this.setLightMode();
    } else {

      if (this.getMode() === 'on') {
        this.setDarkMode();
      } else {
        this.setLightMode();
      }

    }
   // this.modeSubject.next(this.getMode());
  }

  public getMode(): string {
    const mode = localStorage.getItem('darkmode');
    return JSON.parse(mode);
  }
}
