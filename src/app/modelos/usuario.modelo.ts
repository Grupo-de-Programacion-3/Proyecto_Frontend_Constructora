import { UsuarioModule } from "../modulos/usuario/usuario.module";

export class UsuarioModelo{
    id_usuario?: String; 
    documento?: String;
    nombres?: String;
    apellidos?: String;
    correo?: String;
    celular?: String;
    ciudad_accion?: String;
    clave?: String;
    rol?: String;
    user?:UsuarioModelo;
    tk?: String;
    isLoggedIn: boolean = false;

}