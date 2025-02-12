import express, { Request, Response } from "express";
import dotenv from "dotenv";
var cors = require('cors')

//Inicio Import locales 
import {Post} from './model/post'
import {DbConfig} from './config/dbconfig'


//Fin Import locales 
var mysql = require('mysql');

// configures dotenv to work in your application
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors())

app.get('/getPosts', async (req, res) => {
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
  let offsetValue = 10
  let Posts = new Array<Post>;
  await con.connect(function(err: any) {
    if (err) throw err;
    con.query("select * from post limit 10 offset "+offsetValue+";", function (err: any, result: any, fields: any) {
      if (err) throw err;
      Posts= result;
      console.log("posts"); console.log(Posts);console.log("fin posts");
      res.send(Posts);
    });
  });
});







app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});