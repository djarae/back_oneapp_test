import express, { Request, Response } from "express";
import dotenv from "dotenv";
var cors = require('cors')
const bodyParser = require('body-parser');



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

// Middleware to parse JSON data
app.use(bodyParser.json());
var resultFinal : {};
app.post('/login', async (req, res) => {
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
    await con.connect(function(err: any ) {
      con.query("SELECT * FROM usuario where email='"+requestData.email+"' and contraseña='"+requestData.contrasena+"';"  , function (err: any, result: any, fields: any) {
        try {
          if ( (result[0].Email==requestData.email) && (result[0].Contraseña==requestData.contrasena))
            {console.log("iguales")
              resultFinal = "true";
              res.send(resultFinal);
            }
        } catch (error) {
         console.log("error de contrasena o usuario")
         resultFinal = "false";
         res.send(resultFinal);
        } 
       
      });
    });
 
  });


//a

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



app.post('/postPost', async (req, res) => {
    let maximo = ""
    let maximoNumerico = 0
  console.log("titulo es");
  // console.log( req.body)
  const requestData = req.body;
  console.log( requestData)
console.log(requestData.titulo)
  //Start Db Config
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneappdb"
  });
  //End Db Config
  await con.connect(function(err: any ) {
   //Start Db Config
   var mysql = require('mysql');
   var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "oneappdb"
   });
    con.query("SELECT count(id)+1 as maximito FROM `post` WHERE 1;", function (err: any, result: any, fields: any) {
      if (err) throw err;
      let resultJson = JSON.stringify(result);
      let jsonparse = JSON.parse(resultJson);
       maximo = jsonparse[0].maximito
      console.log(jsonparse[0].maximito);
      maximoNumerico= parseInt(maximo)
      maximoNumerico=maximoNumerico+1
       con.connect(function(err: any ) {
        con.query("Insert into post values ("+maximoNumerico+",1,'"+requestData.titulo+"','"+requestData.contenido+"', CURRENT_DATE) ", function (err: any, result: any, fields: any) {
          if (err) throw err;
         
        });
      });
      res.send("Ok");
    });
  
    });
  });


 
  app.put('/putPost/:id', async (req, res) => {
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
    con.query(
      `UPDATE post SET titulo = ?, contenido = ? WHERE id = ?`,
      [titulo, contenido, id],
      (err : any, result : any) => {
        if (err) throw err;
        res.send('Post actualizado');
      }
    );
  });
  
  app.delete('/deletePost/:id', async (req, res) => {
     //Start Db Config
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneappdb"
  });
    const { id } = req.params;
    con.query(`DELETE FROM post WHERE id = ?`, [id], (err : any, result:any) => {
      if (err) throw err;
      res.send('Post eliminado');
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