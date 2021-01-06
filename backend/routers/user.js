/*LOGIQUE ROUTE POUR CE QUI CONCERNE L'AUTHENTIFICATION DES USERS */

const express = require("express");
//Création d'un router Express qui contient toutes les routes des requêtes User
const router = express.Router();
//Importation du middleware de validation des inputs user
const {validateSignup, validateLogin} = require("../middleware/user-validator.js");
//Importation du controller
const userCtrl = require("../controllers/user");

//Requête POST pour inscription
router.post("/signup", /*validateSignup, */userCtrl.signup); //Le middleware validateSignup ne fonctionne pas !

//Requête POST pour connexion
router.post("/login", /*validateLogin, */userCtrl.login);

//Requête DELETE pour suppression de compte
router.delete("/delete", userCtrl.deleteAccount);

//Exportation du router
module.exports = router;
