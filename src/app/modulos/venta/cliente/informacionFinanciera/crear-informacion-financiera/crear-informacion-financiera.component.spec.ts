import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInformacionFinancieraComponent } from './crear-informacion-financiera.component';

describe('CrearInformacionFinancieraComponent', () => {
  let component: CrearInformacionFinancieraComponent;
  let fixture: ComponentFixture<CrearInformacionFinancieraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInformacionFinancieraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInformacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
