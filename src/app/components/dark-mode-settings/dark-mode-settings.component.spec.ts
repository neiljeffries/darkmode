import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeSettingsComponent } from './dark-mode-settings.component';

describe('DarkModeSettingsComponent', () => {
  let component: DarkModeSettingsComponent;
  let fixture: ComponentFixture<DarkModeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarkModeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkModeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
