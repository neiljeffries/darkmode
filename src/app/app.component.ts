import { Component, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DarkModeSettingsComponent } from './components/dark-mode-settings/dark-mode-settings.component';
import { DarkmodeService } from './services/darkmode.service';
import { SlideInOutAnimation } from './interfaces/animations';
// import { SlideInOutAnimation } from './animations';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [SlideInOutAnimation]
})
export class AppComponent {
  title = 'Angular Dark Mode';
  dialogRef: MatDialogRef<DarkModeSettingsComponent> = null;

  constructor(
    public dialog: MatDialog,
    private darkModeService: DarkmodeService
  ) {
    this.darkModeService.init();
  }

  openDarkModeSettingsDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    if (!this.dialogRef) {

      this.dialogRef = this.dialog.open(DarkModeSettingsComponent, { data: { trigger: target }, hasBackdrop: false, width: '275px' });

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
