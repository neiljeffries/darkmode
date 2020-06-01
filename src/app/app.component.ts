import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DarkModeSettingsComponent } from './components/dark-mode-settings/dark-mode-settings.component';
import { DarkmodeService } from './services/darkmode.service';
import { SlideInOutAnimation } from './interfaces/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [SlideInOutAnimation]
})
export class AppComponent {

  dialogRef: MatDialogRef<DarkModeSettingsComponent>;

  constructor(
    public dialog: MatDialog,
    private darkModeService: DarkmodeService
  ) {
    this.darkModeService.init();
  }

  openDialog(): void {

    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(DarkModeSettingsComponent, { data: {}, hasBackdrop: false, width: '275px' });

      this.dialogRef.afterClosed().subscribe((result) => {
        console.log(`Closed: ${result}`);
        this.dialogRef = null;
      });

      this.dialogRef.afterOpened().subscribe((result) => {
        console.log(`Opened: ${result}`);
      });
    }
  }

}
