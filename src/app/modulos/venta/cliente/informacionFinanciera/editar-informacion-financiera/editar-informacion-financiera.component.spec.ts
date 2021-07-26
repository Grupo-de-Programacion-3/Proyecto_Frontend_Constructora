import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformacionFinancieraComponent } from './editar-informacion-financiera.component';

describe('EditarInformacionFinancieraComponent', () => {
  let component: EditarInformacionFinancieraComponent;
  let fixture: ComponentFixture<EditarInformacionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInformacionFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInformacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
