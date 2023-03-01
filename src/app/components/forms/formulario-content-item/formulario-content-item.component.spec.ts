import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContentItemComponent } from './formulario-content-item.component';

describe('FormularioContentItemComponent', () => {
  let component: FormularioContentItemComponent;
  let fixture: ComponentFixture<FormularioContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioContentItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
