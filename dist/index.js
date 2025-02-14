"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
var cors = require('cors');
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(cors());
app.use(body_parser_1.default.json());
const pool = (0, promise_1.createPool)({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneappdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.body;
    try {
        const [result] = yield pool.query("SELECT * FROM usuario WHERE email = ? AND contraseña = ?", [email, contrasena]);
        if (result.length > 0) {
            res.send("true");
        }
        else {
            res.send("false");
        }
    }
    catch (error) {
        res.status(500).send("Error en el login");
    }
}));
app.post("/getPosts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPagina } = req.body;
    console.log("request");
    console.log(idPagina);
    try {
        const offsetValue = 10;
        const [posts] = yield pool.query("SELECT * FROM post LIMIT 10 OFFSET " + idPagina, [offsetValue]);
        res.send(posts);
    }
    catch (error) {
        res.status(500).send("Error obteniendo posts");
    }
}));
app.post("/postPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, contenido } = req.body;
    try {
        yield pool.query("INSERT INTO post (idUsuario, titulo, contenido, fechaCreacion) VALUES (?, ?, ?, CURRENT_DATE)", [1, titulo, contenido]);
        res.send("Ok");
    }
    catch (error) {
        res.status(500).send("Error creando post");
    }
}));
app.put("/putPost/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    try {
        yield pool.query("UPDATE post SET titulo = ?, contenido = ? WHERE id = ?", [titulo, contenido, id]);
        res.send("Post actualizado");
    }
    catch (error) {
        res.status(500).send("Error actualizando post");
    }
}));
app.delete("/deletePost/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield pool.query("DELETE FROM post WHERE id = ?", [id]);
        res.send("Post eliminado");
    }
    catch (error) {
        res.status(500).send("Error eliminando post");
    }
}));
app.post("/crearUsuario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, contrasena } = req.body;
    try {
        const [usuarios] = yield pool.query("SELECT * FROM usuario WHERE email = ?", [email]);
        if (usuarios.length > 0) {
            return res.status(400).send("Error: El correo ya está registrado.");
        }
        yield pool.query("INSERT INTO usuario (email, contraseña, idRol, fechaCreacion) VALUES (?, ?, ?, CURRENT_DATE)", [email, contrasena, 2]);
        res.send("Usuario creado exitosamente.");
    }
    catch (error) {
        res.status(500).send("Error creando usuario");
    }
}));
app.get("/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [result] = yield pool.query("SELECT * FROM Post WHERE id = ?", [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.json(result[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo el post", error });
    }
}));
app.post("/comentarios/getComentario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idPost } = req.body;
    try {
        const [result] = yield pool.query("SELECT * FROM Comentario WHERE idPost = ?", [idPost]);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo comentarios", error });
    }
}));
app.post("/comentario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario, idPost, contenido } = req.body;
    try {
        yield pool.query("INSERT INTO Comentario (idUsuario, idPost, contenido, fechaCreacion) VALUES (?, ?, ?, NOW())", [idUsuario, idPost, contenido]);
        res.status(201).json({ message: "Comentario creado" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creando comentario", error });
    }
}));
app.put("/comentario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { contenido } = req.body;
    try {
        yield pool.query("UPDATE Comentario SET contenido = ? WHERE id = ?", [contenido, id]);
        res.json({ message: "Comentario actualizado" });
    }
    catch (error) {
        res.status(500).json({ message: "Error editando comentario", error });
    }
}));
app.delete("/comentario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield pool.query("DELETE FROM Comentario WHERE id = ?", [id]);
        res.json({ message: "Comentario eliminado" });
    }
    catch (error) {
        res.status(500).json({ message: "Error eliminando comentario", error });
    }
}));
app.get("/", (req, res) => {
    res.status(200).send("Hello World");
});
app.listen(PORT, () => {
    console.log("Server running at PORT:", PORT);
}).on("error", (error) => {
    throw new Error(error.message);
});
