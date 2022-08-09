import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsResultsComponent } from './params-results.component';

describe('ParamsResultsComponent', () => {
  let component: ParamsResultsComponent;
  let fixture: ComponentFixture<ParamsResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamsResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
