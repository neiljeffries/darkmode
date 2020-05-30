import { Component, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DarkModeSettingsComponent } from './components/dark-mode-settings/dark-mode-settings.component';
import { DarkmodeService } from './services/darkmode.service';
declare var $: any;

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   title = 'Angular Dark Mode';
   dialogRef: MatDialogRef<DarkModeSettingsComponent>;
   open = false;
   constructor(
      public dialog: MatDialog,
      private darkModeService: DarkmodeService
   ) {
      this.darkModeService.init();
   }

   openDarkModeSettingsDialog(evt: MouseEvent): void {
      const target = new ElementRef(evt.currentTarget);
      if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(DarkModeSettingsComponent, {
         data: { trigger: target },
         hasBackdrop: false,
         width: '275px'
      });

      this.dialogRef.afterClosed().subscribe((result) => {
         console.log(`DarkMode Settings Dialog Closed: ${result}`);
         this.dialogRef = null;
      });

      this.dialogRef.afterOpened().subscribe((result) => {
         console.log(`DarkMode Settings Dialog Opened: ${result}`);
      });
    }
   }
}
