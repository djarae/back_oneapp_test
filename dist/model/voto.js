"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voto = void 0;
class Voto {
    constructor(id, idPost, idUsuario) {
        this.id = id;
        this.idPost = idPost;
        this.idUsuario = idUsuario;
    }
    get Id() { return this.id; }
    get IdPost() { return this.idPost; }
    get IdUsuario() { return this.idUsuario; }
}
exports.Voto = Voto;
