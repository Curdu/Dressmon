import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondidionsComponent } from './condidions.component';

describe('CondidionsComponent', () => {
  let component: CondidionsComponent;
  let fixture: ComponentFixture<CondidionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondidionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondidionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
