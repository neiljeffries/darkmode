import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DarkModeSettingsComponent } from './components/dark-mode-settings/dark-mode-settings.component';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular Dark Mode';
  constructor(public dialog: MatDialog, private darkModeService: DarkmodeService) {
    this.darkModeService.init();
  }

  openDarkModeSettingsDialog() {
    const dialogRef = this.dialog.open(DarkModeSettingsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
