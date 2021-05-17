import { Role } from "../role";
import { Genero } from "./genero";

export class Usuario {
    idUsuario: any;
    username: string;
    password: string;
    email: string;
    tipo: Role;
    genero: Genero;
    pais: string;
    nacimiento: string;
    fotoPerfil: string;
}
