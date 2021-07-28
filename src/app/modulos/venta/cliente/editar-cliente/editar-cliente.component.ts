import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  fgValidador: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicio : ClienteService,
    private router : Router,
    private route : ActivatedRoute) {
    
   }

   ConstruirFormulario(){
     this.fgValidador= this.fb.group({

      id: ['', [Validators.required]],
      documento: ['',[Validators.required]],
      nombres: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      fecha_nacimiento: ['',[Validators.required]],
      fotografia: ['',[Validators.required]],
      num_celular: ['',[Validators.required]],
      correo: ['',[Validators.required]],
      direccion: ['',[Validators.required]]

     });
   }

  ngOnInit(): void {
    this.ConstruirFormulario();
    let id = this.route.snapshot.params["id"];
    this.ObtenerRegistroPorId(id);
  }

  ObtenerRegistroPorId(id : number){
    this.servicio.BuscarRegistros(id).subscribe(
      (datos) =>{

        this.ObtenerFgValidador.id.setValue(datos.id_cliente);
        this.ObtenerFgValidador.documento.setValue(datos.documento);
        this.ObtenerFgValidador.nombres.setValue(datos.nombres);
        this.ObtenerFgValidador.apellidos.setValue(datos.apellidos);
        this.ObtenerFgValidador.fecha_nacimiento.setValue(datos.fecha_nacimiento);
        this.ObtenerFgValidador.fotografia.setValue(datos.fotografia);
        this.ObtenerFgValidador.num_celular.setValue(datos.num_celular);
        this.ObtenerFgValidador.correo.setValue(datos.correo);
        this.ObtenerFgValidador.direccion.setValue(datos.direccion);

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
    let doc = this.ObtenerFgValidador.documento.value;
    let nom = this.ObtenerFgValidador.nombres.value;
    let ape = this.ObtenerFgValidador.apellidos.value;
    let f_n = this.ObtenerFgValidador.fecha_nacimiento.value;
    let fot = this.ObtenerFgValidador.fotografia.value;
    let n_c = this.ObtenerFgValidador.num_celular.value;
    let cor = this.ObtenerFgValidador.correo.value;
    let dir = this.ObtenerFgValidador.direccion.value;

    let modelo : ClienteModelo = new ClienteModelo();

    modelo.id_cliente = id;
    modelo.documento = doc;
    modelo.nombres = nom;
    modelo.apellidos = ape;
    modelo.fecha_nacimiento = f_n;
    modelo.fotografia = fot;
    modelo.num_celular = n_c;
    modelo.correo = cor;
    modelo.direccion = dir;

    this.servicio.ModificarRegistro(modelo).subscribe(
      (datos) => {
        alert("Registro modificado correctanente");
        this.router.navigate(["/ventas/listar-clientes"]);
      },
      (err) => {
        alert("Error modificando el registro");
      }
    )
  }
}