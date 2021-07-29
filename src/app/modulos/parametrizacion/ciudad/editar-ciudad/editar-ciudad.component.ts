import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { PaisService } from 'src/app/servicios/pais.service';
import { PaisModelo } from 'src/app/modelos/pais.modelo';

declare var IniciarSelect: any;

@Component({
  selector: 'app-editar-ciudad',
  templateUrl: './editar-ciudad.component.html',
  styleUrls: ['./editar-ciudad.component.css']
})
export class EditarCiudadComponent implements OnInit {

  listapaises:PaisModelo[] = [];
  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : CiudadService,
    private router : Router,
    private route : ActivatedRoute,
    private servicioPaises : PaisService) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       id: ['',[Validators.required]],
       codigo: ['',[Validators.required]],
       nombre: ['',[Validators.required]],
       paisId: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
    this.CargarPaises();
       
    
  }
  CargarPaises(){
    this.servicioPaises.ListarRegistros().subscribe(
      (datos) => {
        this.listapaises = datos;
        setTimeout (() =>{
          IniciarSelect();
        }, 500);
      }
    );
  }
  ObtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{
        this.ObtenerFgValidador.id.setValue(datos.id_ciudad);
        this.ObtenerFgValidador.codigo.setValue(datos.codigo);
        this.ObtenerFgValidador.nombre.setValue(datos.nombre);
        this.ObtenerFgValidador.paisId.setValue(datos.paisId);
      },
      (err) => {
        alert("No se encuentra el registro con id " + id)
      }
    )
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  ModificarRegistro(){

    let id = this.ObtenerFgValidador.id.value;
    let cod = this.ObtenerFgValidador.codigo.value;
    let nom = this.ObtenerFgValidador.nombre.value;
    let pais = this.ObtenerFgValidador.paisId.value;

    let modelo : CiudadModelo = new CiudadModelo();

    modelo.id_ciudad= parseInt(id);
    modelo.codigo = cod;
    modelo.nombre = nom;
    modelo.paisId= parseInt(pais);

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctamente");
        this.router.navigate(["/parametros/listar-ciudades"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}
