import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarRechazarSolicitudComponent } from './aprobar-rechazar-solicitud.component';

describe('AprobarRechazarSolicitudComponent', () => {
  let component: AprobarRechazarSolicitudComponent;
  let fixture: ComponentFixture<AprobarRechazarSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarRechazarSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarRechazarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
