//Importation du package express (frameworks pour faciliter l'usage de Node js)
const express = require("express");
//Importation du package bodyparser, pour rendre les données du corps de tous types de requêtes 
const bodyParser = require("body-parser");

//Importation du package pour l'accès à la base de données et à ses fonctionnalités pour un site dynamique ????

//Importation des routers pour les requêtes articles/users
const articleRoutes = require("./routers/article");
//const userRoutes = require("./routes/user");

//Importation pour accéder au path du server
const path = require("path");

//Importation du fichier cors.js pour permettre l'échange entre serveurs
const cors = require("./services/cors");

//Plugin dotenv (masquage des données de connexion à la DBbase via un fichier dotenv et une création de variables pour le nom du user et le password)
const dotenv = require("dotenv");

//Importation du package mysql, , pour l'accès à la base de données et à ses fonctionnalités pour un site dynamique
var mysql = require("mysql");

//Connexion à la base de données avec dotenv
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

//Déclaration de notre appli comme fonctionnant avec express (et donc Node)
const app = express();

//Ajout des headers aux réponses pour permettre le CORS 
app.use(cors);

//Mise à un format exploitable du body des requêtes
app.use(bodyParser.json());

/*app.use((req, res, next) => {
    res.json({message : "Welcome to Groupomania application !"});
    next();
});*/


//Définit les route des deux routeurs "Sauce"/"User" ainsi que pour les images téléchargées
//app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/articles", articleRoutes);
//app.use("/api/auth", userRoutes);

//Exportation de l'appli vers server.js 
module.exports = app;





/*Importation des packages de sécurité pour être aux normes OWASP*/
/*
//Plugin dotenv (masquage des données de connextion à la DBbase via un fichier dotenv et une création de variables pour le nom du user et le password)
const {config} = require("dotenv");
//Package helmet (13 middleware pour sécuriser les données et les connexions)
const helmet = require("helmet");
//Package hpp (to protect your system from HTTP parameter pollution attacks)
const hpp = require("hpp");
//Middleware limiter.js contre le "brute force" 
const limiter = require("./middleware/limiter");
//Middleware toobusy.js pour empêcher le Denial of Service (DoS) en monitorant le event loop
const toobusy = require("./middleware/toobusy");
//Package mongo-express-sanitize : validation des données, enlève les données qui commencent par $, qui peuvent être utilisées par des hackers
//Middleware session.js pour sécuriser les cookies de session
const session = require("./middleware/session");
const mongoSanitize = require("express-mongo-sanitize");
//Package express-session, pour définir les flags des cookies (contre attaques XSS et CSRF)
*/

/*SECURITE : lancement des middlewares et plugins de sécurité*/
/*app.use(helmet());
app.use(hpp());
app.use("/api/auth", limiter);
app.use(toobusy);
//Définition des tailles limites pour les requêtes pour que les hackers ne puissent pas saturer le système
app.use(express.urlencoded({ limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));
app.use(session);
/*FIN SECURITE*/


/*SECURITE SUITE*/
//Pour valider les inputs, enlever les caractères suspects commençant par $
//app.use(mongoSanitize());
/*FIN SECURITE*/