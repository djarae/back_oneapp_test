"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, idUsuario, titulo, contenido, fechaCreacion) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
    }
    get Id() { return this.id; }
    get IdUsuario() { return this.idUsuario; }
    get Titulo() { return this.titulo; }
    get Contenido() { return this.contenido; }
    get FechaCreacion() { return this.fechaCreacion; }
    set Titulo(value) { this.titulo = value; }
    set Contenido(value) { this.contenido = value; }
}
exports.Post = Post;
