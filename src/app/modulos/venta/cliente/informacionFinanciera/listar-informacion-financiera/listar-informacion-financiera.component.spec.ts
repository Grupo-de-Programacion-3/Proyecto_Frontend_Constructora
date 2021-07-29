import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInformacionFinancieraComponent } from './listar-informacion-financiera.component';

describe('ListarInformacionFinancieraComponent', () => {
  let component: ListarInformacionFinancieraComponent;
  let fixture: ComponentFixture<ListarInformacionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInformacionFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInformacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
