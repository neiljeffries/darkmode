import { Component } from '@angular/core';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angularTestDarkmode';
  mode: string;

  constructor(
    private darkModeService: DarkmodeService
    ) {
    this.darkModeService.init();
    this.darkModeService.mode.subscribe(mode => {
      this.mode = mode;
    });
  }

  public setLightMode(): void {
    this.darkModeService.setLightMode();
  }

  public setDarkMode(): void {
    this.darkModeService.setDarkMode();
  }
}
