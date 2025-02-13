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
