/*FICHIER EXTERNALISE DE CONFIGURATION POUR PERMETTRE LA CONNECTION A LA BASE DE DE DONNEES MYSQL */

//Plugin dotenv (masquage des données de connexion à la DBbase via un fichier dotenv et une création de variables pour le nom du user et le password)
const dotenv = require("dotenv");

//Importation du package mysql
var mysql = require("mysql");

dotenv.config();
var connection = mysql.createConnection({
    host : "localhost",
    user: process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
});

connection.connect(function(error) {
    if (error) {
        console.error("La connexion à MySQL a échoué !"); 
        return;
    }
    console.log("Connexion à MySQL réussie !");
});

 module.exports = connection;                  
 