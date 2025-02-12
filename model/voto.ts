
export class Voto {
    private id: number;
    private idPost: number;
    private idUsuario: number;

    constructor(id: number, idPost: number, idUsuario: number) {
        this.id = id;
        this.idPost = idPost;
        this.idUsuario = idUsuario;
    }

    get Id() { return this.id; }
    get IdPost() { return this.idPost; }
    get IdUsuario() { return this.idUsuario; }
}
