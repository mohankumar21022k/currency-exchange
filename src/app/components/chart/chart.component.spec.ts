import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let fixture: ComponentFixture<ChartComponent>;
  let component: ChartComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
    });

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set keys and values for the graph when ngOnChanges is called', () => {
    component.from = 'EUR';
    component.to = 'USD';

    component.ngOnChanges();

    expect(component.noHistory).toBeFalse();
    expect(component.keys.length).toBeGreaterThan(0);
    expect(component.values.length).toBeGreaterThan(0);
    expect(component.lineChartData).toBeDefined();
  });

  it('should set keys and values for the graph when ngOnInit is called', () => {
    component.from = 'EUR';
    component.to = 'USD';

    component.ngOnInit();

    expect(component.noHistory).toBeFalse();
    expect(component.keys.length).toBeGreaterThan(0);
    expect(component.values.length).toBeGreaterThan(0);
    expect(component.lineChartData).toBeDefined();
  });

  it('should handle no history data', () => {
    component.from = 'EUR';
    component.to = 'JPY';

    component.ngOnInit();

    expect(component.noHistory).toBeTrue();
    expect(component.keys.length).toBe(0);
    expect(component.values.length).toBe(0);
    expect(component.lineChartData).toBeUndefined();
  });
});
