//Importation du package express (frameworks pour faciliter l'usage de Node js)
const express = require("express");
//Importation du package bodyparser, pour rendre les données du corps de tous types de requêtes 
const bodyParser = require("body-parser");

//Importation des routers pour les requêtes articles/users
const articleRoutes = require("./routers/article");
const userRoutes = require("./routers/user");
const commentRoutes = require("./routers/comment");
const thumbRoutes = require("./routers/thumb");

//Importation pour accéder au path du server
const path = require("path");

//Importation du fichier cors.js pour permettre l'échange entre serveurs
const cors = require("./services/cors");

/* Plugins de sécurité */
//Package helmet (13 middleware pour sécuriser les données et les connexions)
const helmet = require("helmet");                     
//Package hpp (to protect your system from HTTP parameter pollution attacks)
const hpp = require("hpp");
//Middleware express-rate-limit pour limiter le nombre de requêtes et de tentatives de connexion
const rateLimit = require("./services/limiter");
const reqLimiter = require("./services/limiter");
//Middleware toobusy.js pour empêcher le Denial of Service (DoS) en monitorant le event loop
const toobusy = require("./services/toobusy");
//Middleware session.js pour sécuriser les cookies de session
const session = require("./services/session");
/* Fin sécurité */

//Importation du fichier de configuration de la connection à la base de données MySQL
var connection = require("./services/mysql.config");

//Déclaration de notre appli comme fonctionnant avec express (et donc Node)
const app = express();

//Ajout des headers aux réponses pour permettre le CORS 
app.use(cors);
//Lancement des middlewares et plugins de sécurité
app.use(helmet());
app.use(hpp());
app.use("/auth", rateLimit.authLimiter);
app.use("/articles", rateLimit.reqLimiter);
app.use(toobusy);
app.use(session);

//Mise à un format exploitable du body des requêtes
app.use(bodyParser.json());

//Définit les route des quatre routeurs "Article"/"User"/"Comment"/"Thumb"
app.use("/articles", articleRoutes);
app.use("/auth", userRoutes);
app.use('/articles/:slug/comments', commentRoutes);
app.use('/articles/:slug/', thumbRoutes);

//Exportation de l'appli vers server.js 
module.exports = app;


