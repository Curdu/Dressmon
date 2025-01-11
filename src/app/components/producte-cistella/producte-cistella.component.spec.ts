import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducteCistellaComponent } from './producte-cistella.component';

describe('ProducteCistellaComponent', () => {
  let component: ProducteCistellaComponent;
  let fixture: ComponentFixture<ProducteCistellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducteCistellaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducteCistellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
