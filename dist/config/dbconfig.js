"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConfig = void 0;
var mysql = require('mysql');
class DbConfig {
    constructor() {
        const mysql = require('mysql');
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "oneappdb"
        });
    }
}
exports.DbConfig = DbConfig;
