import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciSessioComponent } from './inici-sessio.component';

describe('IniciSessioComponent', () => {
  let component: IniciSessioComponent;
  let fixture: ComponentFixture<IniciSessioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciSessioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciSessioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
