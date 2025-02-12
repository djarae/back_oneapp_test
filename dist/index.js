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
//Fin Import locales 
var mysql = require('mysql');
// configures dotenv to work in your application
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(cors());
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
    //Paginado: Offset es desde donde queremos buscar. Limit es la cantidad que deseamos buscar desde ese punto
    //Esto va perfecto para paginar de 10 en 10 solo debemos enviar el numero de pagina como parametro!
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
app.get("/", (request, response) => {
    response.status(200).send("Hello World");
});
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
