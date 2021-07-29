import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarInformacionFinancieraComponent } from './eliminar-informacion-financiera.component';

describe('EliminarInformacionFinancieraComponent', () => {
  let component: EliminarInformacionFinancieraComponent;
  let fixture: ComponentFixture<EliminarInformacionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarInformacionFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarInformacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
