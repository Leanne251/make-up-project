import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAllProducts } from './search-all-products.component';

describe('SearchFormComponent', () => {
  let component: SearchAllProducts;
  let fixture: ComponentFixture<SearchAllProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAllProducts ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAllProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
