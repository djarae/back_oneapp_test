var mysql = require('mysql');

export class DbConfig{

   

    constructor() {
        const  mysql = require('mysql');
        const con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "oneappdb"
        });
    }
    

}