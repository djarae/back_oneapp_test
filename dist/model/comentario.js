"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comentario = void 0;
class Comentario {
    constructor(id, idUsuario, idPost, contenido, fechaCreacion) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idPost = idPost;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
    }
    get Id() { return this.id; }
    set Id(value) { this.id = value; }
    get IdUsuario() { return this.idUsuario; }
    set IdUsuario(value) { this.idUsuario = value; }
    get IdPost() { return this.idPost; }
    set IdPost(value) { this.idPost = value; }
    get Contenido() { return this.contenido; }
    set Contenido(value) { this.contenido = value; }
    get FechaCreacion() { return this.fechaCreacion; }
    set FechaCreacion(value) { this.fechaCreacion = value; }
}
exports.Comentario = Comentario;
