import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  open = false;
  constructor(
    public dialog: MatDialog,
    private darkModeService: DarkmodeService) {
    this.darkModeService.init();
    }

  openDarkModeSettingsDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.dialog.open(DarkModeSettingsComponent, {
      data: { trigger: target },
      hasBackdrop : false
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog Closed result: ${result}`);
      this.open = false;
    });

    dialogRef.afterOpened().subscribe( result => {
      console.log(`Dialog Opened result: ${result}`);
      this.open = true;
    });
  }

 

}
