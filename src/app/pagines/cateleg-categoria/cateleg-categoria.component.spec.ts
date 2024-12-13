import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatelegCategoriaComponent } from './cateleg-categoria.component';

describe('CatelegCategoriaComponent', () => {
  let component: CatelegCategoriaComponent;
  let fixture: ComponentFixture<CatelegCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatelegCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatelegCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
