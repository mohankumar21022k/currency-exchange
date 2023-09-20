import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BackgroundComponent } from './background.component';
import { OverlayComponent } from '../overlay/overlay.component';

describe('BackgroundComponent', () => {
  let component: BackgroundComponent;
  let fixture: ComponentFixture<BackgroundComponent>;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundComponent],
      imports: [MatDialogModule],
      providers: [MatDialog],
    });

    fixture = TestBed.createComponent(BackgroundComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open a dialog when openDialog is called', () => {
    const openSpy = spyOn(dialog, 'open');
    component.openDialog();
    expect(openSpy).toHaveBeenCalledWith(OverlayComponent, {
      width: '800px',
      disableClose: true,
    });
  });
});
