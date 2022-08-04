import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchFormComponent } from './new-search-form.component';

describe('NewSearchFormComponent', () => {
  let component: NewSearchFormComponent;
  let fixture: ComponentFixture<NewSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
