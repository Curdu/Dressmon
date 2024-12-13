import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalegProducteComponent } from './cataleg-producte.component';

describe('CatalegProducteComponent', () => {
  let component: CatalegProducteComponent;
  let fixture: ComponentFixture<CatalegProducteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalegProducteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalegProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
