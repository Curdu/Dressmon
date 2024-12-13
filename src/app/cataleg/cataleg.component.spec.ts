import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalegComponent } from './cataleg.component';

describe('CatalegComponent', () => {
  let component: CatalegComponent;
  let fixture: ComponentFixture<CatalegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
