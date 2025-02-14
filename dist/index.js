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
const bodyParser = require('body-parser');
//Fin Import locales 
var mysql = require('mysql');
// configures dotenv to work in your application
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json());
var resultFinal;
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entrro al login");
    const requestData = req.body;
    //console.log( requestData);console.log(requestData.titulo)
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "oneappdb"
    });
    //End Db Config
    yield con.connect(function (err) {
        con.query("SELECT * FROM usuario where email='" + requestData.email + "' and contraseña='" + requestData.contrasena + "';", function (err, result, fields) {
            try {
                if ((result[0].Email == requestData.email) && (result[0].Contraseña == requestData.contrasena)) {
                    console.log("iguales");
                    resultFinal = "true";
                    res.send(resultFinal);
                }
            }
            catch (error) {
                console.log("error de contrasena o usuario");
                resultFinal = "false";
                res.send(resultFinal);
            }
        });
    });
}));
//a
app.get('/getPosts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Start Db Config
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "oneappdb"
    });
    //End Db Config
    let offsetValue = 10;
    let Posts = new Array;
    yield con.connect(function (err) {
        if (err)
            throw err;
        con.query("select * from post limit 10 offset " + offsetValue + ";", function (err, result, fields) {
            if (err)
                throw err;
            Posts = result;
            console.log("posts");
            console.log(Posts);
            console.log("fin posts");
            res.send(Posts);
        });
    });
}));
app.post('/postPost', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let maximo = "";
    let maximoNumerico = 0;
    console.log("titulo es");
    // console.log( req.body)
    const requestData = req.body;
    console.log(requestData);
    console.log(requestData.titulo);
    //Start Db Config
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "oneappdb"
    });
    //End Db Config
    yield con.connect(function (err) {
        //Start Db Config
        var mysql = require('mysql');
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "oneappdb"
        });
        con.query("SELECT count(id)+1 as maximito FROM `post` WHERE 1;", function (err, result, fields) {
            if (err)
                throw err;
            let resultJson = JSON.stringify(result);
            let jsonparse = JSON.parse(resultJson);
            maximo = jsonparse[0].maximito;
            console.log(jsonparse[0].maximito);
            maximoNumerico = parseInt(maximo);
            maximoNumerico = maximoNumerico + 1;
            con.connect(function (err) {
                con.query("Insert into post values (" + maximoNumerico + ",1,'" + requestData.titulo + "','" + requestData.contenido + "', CURRENT_DATE) ", function (err, result, fields) {
                    if (err)
                        throw err;
                });
            });
            res.send("Ok");
        });
    });
}));
app.put('/putPost/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Start Db Config
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "oneappdb"
    });
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    con.query(`UPDATE post SET titulo = ?, contenido = ? WHERE id = ?`, [titulo, contenido, id], (err, result) => {
        if (err)
            throw err;
        res.send('Post actualizado');
    });
}));
app.delete('/deletePost/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Start Db Config
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "oneappdb"
    });
    const { id } = req.params;
    con.query(`DELETE FROM post WHERE id = ?`, [id], (err, result) => {
        if (err)
            throw err;
        res.send('Post eliminado');
    });
}));
app.post('/crearUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let maximo = "";
    let maximoNumerico = 0;
    const requestData = req.body;
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "oneappdb"
    });
    yield con.connect(function (err) {
        con.query("SELECT * FROM usuario WHERE email = '" + requestData.email + "';", function (err, result) {
            if (err)
                throw err;
            if (result.length > 0) {
                res.status(400).send("Error: El correo ya está registrado.");
            }
            else {
                con.query("SELECT COUNT(id) + 1 AS maximito FROM `usuario` WHERE 1;", function (err, result, fields) {
                    if (err)
                        throw err;
                    let resultJson = JSON.stringify(result);
                    let jsonparse = JSON.parse(resultJson);
                    maximo = jsonparse[0].maximito;
                    maximoNumerico = parseInt(maximo);
                    maximoNumerico = maximoNumerico + 1;
                    con.query("INSERT INTO usuario (id, email, contraseña, idRol, fechaCreacion) VALUES (" +
                        maximoNumerico + ", '" +
                        requestData.email + "', '" +
                        requestData.contrasena + "', " +
                        "2" + ", CURRENT_DATE);", function (err, result) {
                        if (err)
                            throw err;
                        res.send("Usuario creado exitosamente.");
                    });
                });
            }
        });
    });
}));
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
const pool = (0, promise_1.createPool)({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneappdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// Obtener detalle de un post
app.get("/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield pool.query("SELECT * FROM Post WHERE id = ?", [id]);
        if (!Array.isArray(result) || result.length === 0) {
            return res.status(404).json({ message: "Post no encontrado" });
        }
        res.json(result[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo el post", error });
    }
}));
// Obtener comentarios de un post
app.post("/comentarios/getComentario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestvalue = req.body;
        console.log("id post es ");
        console.log(requestvalue.idPost);
        const [result] = yield pool.query("SELECT * FROM Comentario WHERE idPost =" + requestvalue.idPost);
        console.log(result);
        console.log("result era");
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error obteniendo comentarios", error });
    }
}));
// Crear un comentario
app.post("/comentario", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario, idPost, contenido } = req.body;
        const [result] = yield pool.query("INSERT INTO Comentario (idUsuario, idPost, contenido, fechaCreacion) VALUES (?, ?, ?, NOW())", [idUsuario, idPost, contenido]);
        res.status(201).json({ message: "Comentario creado", id: result.insertId });
    }
    catch (error) {
        res.status(500).json({ message: "Error creando comentario", error });
    }
}));
// Editar un comentario
app.put("/comentario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { contenido } = req.body;
        const [result] = yield pool.query("UPDATE Comentario SET contenido = ? WHERE id = ?", [contenido, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.json({ message: "Comentario actualizado" });
    }
    catch (error) {
        res.status(500).json({ message: "Error editando comentario", error });
    }
}));
// Eliminar un comentario
app.delete("/comentario/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [result] = yield pool.query("DELETE FROM Comentario WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.json({ message: "Comentario eliminado" });
    }
    catch (error) {
        res.status(500).json({ message: "Error eliminando comentario", error });
    }
}));
