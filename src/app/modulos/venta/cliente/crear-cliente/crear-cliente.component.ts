import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  nombreFotografiaTemp : String = "Sin imagen";

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : ClienteService,
    private router : Router) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({
       documento: ['',[Validators.required]],
       nombres: ['',[Validators.required]],
       apellidos: ['',[Validators.required]],
       fecha_nacimiento: ['',[Validators.required]],
       fotografia: ['',[Validators.required]],
       nombre_fot: ['',[Validators.required]],
       num_celular: ['',[Validators.required]],
       correo: ['',[Validators.required]],
       direccion: ['',[Validators.required]]
     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
  }

  get ObtenerFgValidador(){
    return this.fgValidador.controls;
  }

  GuardarRegistro(){
    let doc = this.ObtenerFgValidador.documento.value;
    let nom = this.ObtenerFgValidador.nombres.value;
    let ape = this.ObtenerFgValidador.apellidos.value;
    let f_n = this.ObtenerFgValidador.fecha_nacimiento.value;
    let fot = this.ObtenerFgValidador.fotografia.value;
    let n_c = this.ObtenerFgValidador.num_celular.value;
    let cor = this.ObtenerFgValidador.correo.value;
    let dir = this.ObtenerFgValidador.direccion.value;

    let modelo : ClienteModelo = new ClienteModelo();

    modelo.documento = doc;
    modelo.nombres = nom;
    modelo.apellidos = ape;
    modelo.fecha_nacimiento = f_n;
    modelo.fotografia = fot;
    modelo.num_celular = n_c;
    modelo.correo = cor;
    modelo.direccion = dir;

    this.servicio.AlmacenarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro almacenado correctanente");
        this.router.navigate(["/ventas/listar-clientes"]);
      },
      (err) => {
        alert("Error almacenando el registro");
      }
    )
  }

  CuandoSeleccionanArchivo(event:any){
    if(event.target.files.length > 0){
      let archivo = event.target.files[0];
      this.fgValidador.controls.fotografia.setValue(archivo);
    }else{
      console.log("Se ha cancelado la seleccion del archivo");
    }
  }

  CargarImagenAlServidor(){
    let formData = new FormData();
    formData.append('file', this.fgValidador.controls.fotografia.value);
    this.servicio.CargarArchivo(formData).subscribe(
      (datos) =>{
        this.nombreFotografiaTemp = datos.filename;
        this.fgValidador.controls.nombre_fot.setValue(datos.filename);
      },
      (error) => {
        alert("Se ha producido un error al cargar el archivo.");
      }
    );
  }

}
