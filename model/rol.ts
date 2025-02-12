class Rol {
    private id: number;
    private nombreRol: string;

    constructor(id: number, nombreRol: string) {
        this.id = id;
        this.nombreRol = nombreRol;
    }

    get Id() { return this.id; }
    get NombreRol() { return this.nombreRol; }

    set NombreRol(value: string) { this.nombreRol = value; }
}