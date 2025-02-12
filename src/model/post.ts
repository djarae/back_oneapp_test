class Post {
    private id: number;
    private idUsuario: number;
    private titulo: string;
    private contenido: string;
    private fechaCreacion: Date;

    constructor(id: number, idUsuario: number, titulo: string, contenido: string, fechaCreacion: Date) {
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

    set Titulo(value: string) { this.titulo = value; }
    set Contenido(value: string) { this.contenido = value; }
}