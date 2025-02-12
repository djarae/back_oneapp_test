"use strict";
class Rol {
    constructor(id, nombreRol) {
        this.id = id;
        this.nombreRol = nombreRol;
    }
    get Id() { return this.id; }
    get NombreRol() { return this.nombreRol; }
    set NombreRol(value) { this.nombreRol = value; }
}
