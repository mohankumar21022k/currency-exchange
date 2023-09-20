import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './components';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, BackgroundComponent],
      imports: [MatDialogModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
