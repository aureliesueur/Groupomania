/*LOGIQUE ROUTE POUR CE QUI CONCERNE L'AUTHENTIFICATION DES USERS */

const express = require("express");
//Création d'un router Express qui contient toutes les routes des requêtes User
const router = express.Router();
//Importation du middleware de validation des inputs user
//const {validateSignup, validateLogin} = require("../middleware/user-validator.js");
//Importation du controller
const userCtrl = require("../controllers/user");


//Importation du middleware de check des inputs par express-validator NE MARCHE PAS !
//const {body} = require('express-validator');


//Requête POST pour inscription
router.post("/signup", /*body("email").isEmail(), body("password").isLength({min:5})/userCtrl.validate("signup"), */userCtrl.signup); //Le middleware validateSignup ne fonctionne pas !

//Requête POST pour connexion
router.post("/login", /*userCtrl.validate("login"), */userCtrl.login);

//Requête DELETE pour suppression de compte
router.delete("/:id", userCtrl.deleteAccount);

//Exportation du router
module.exports = router;
