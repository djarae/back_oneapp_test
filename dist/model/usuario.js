"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id, email, contraseña, idRol, fechaCreacion) {
        this.id = id;
        this.email = email;
        this.contraseña = contraseña;
        this.idRol = idRol;
        this.fechaCreacion = fechaCreacion;
    }
    get Id() { return this.id; }
    get Email() { return this.email; }
    get Contraseña() { return this.contraseña; }
    get IdRol() { return this.idRol; }
    get FechaCreacion() { return this.fechaCreacion; }
    set Email(value) { this.email = value; }
    set Contraseña(value) { this.contraseña = value; }
    set IdRol(value) { this.idRol = value; }
}
exports.Usuario = Usuario;
