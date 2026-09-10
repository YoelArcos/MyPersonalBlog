import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CursorComponent } from './cursor/cursor.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, CursorComponent],
      imports: [CommonModule, RouterModule.forRoot([])]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('initializes the portfolio shell without throwing', () => {
    expect(() => fixture.detectChanges()).not.toThrow();
    expect(fixture.nativeElement.querySelector('router-outlet')).not.toBeNull();
  });
});
