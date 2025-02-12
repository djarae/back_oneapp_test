
// run siomple node index.js      
const express = require('express');
const app = express();
const port = 3000;
var mysql = require('mysql');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getPosts', (req, res) => {
  
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneappdb"
  });
  //Paginado
  //Nota offset es desde donde queremos buscar
  //Limit es la cantidad que deseamos buscar desde ese punto
  //Esto va perfecto para paginar de 10 en 10 solo debemos enviar el numero de 
  //pagina como parametro!
  let offsetValue = 10
  con.connect(function(err) {
    if (err) throw err;
    con.query("select * from post limit 10 offset "+offsetValue+";", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
  
  

 

res.send('Hello World2!');

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});