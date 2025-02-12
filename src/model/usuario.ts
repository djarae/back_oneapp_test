class Usuario {
    private id: number;
    private email: string;
    private contraseña: string;
    private idRol: number;
    private fechaCreacion: Date;

    constructor(id: number, email: string, contraseña: string, idRol: number, fechaCreacion: Date) {
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

    set Email(value: string) { this.email = value; }
    set Contraseña(value: string) { this.contraseña = value; }
    set IdRol(value: number) { this.idRol = value; }
}