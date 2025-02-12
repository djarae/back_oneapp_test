export class Comentario {
    private id: number;
    private idUsuario: number; //Autor del post
    private idPost: number;
    private contenido: string;
    private fechaCreacion: Date;

    constructor(id: number, idUsuario: number, idPost: number, contenido: string, fechaCreacion: Date) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idPost = idPost;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
    }

    get Id(): number { return this.id; }
    set Id(value: number) { this.id = value; }

    get IdUsuario(): number { return this.idUsuario; }
    set IdUsuario(value: number) { this.idUsuario = value; }

    get IdPost(): number { return this.idPost; }
    set IdPost(value: number) { this.idPost = value; }

    get Contenido(): string { return this.contenido; }
    set Contenido(value: string) { this.contenido = value; }

    

    get FechaCreacion(): Date { return this.fechaCreacion; }
    set FechaCreacion(value: Date) { this.fechaCreacion = value; }
}