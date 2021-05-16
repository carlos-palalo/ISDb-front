import { Role } from "./role";

export class User {
    username: string;
    tipo: Role;
    token?: string;
}