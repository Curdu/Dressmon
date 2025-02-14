import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarCanviComponent } from './solicitar-canvi.component';

describe('SolicitarCanviComponent', () => {
  let component: SolicitarCanviComponent;
  let fixture: ComponentFixture<SolicitarCanviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarCanviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarCanviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
