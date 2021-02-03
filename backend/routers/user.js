/*LOGIQUE ROUTE POUR CE QUI CONCERNE L'AUTHENTIFICATION DES USERS */

const express = require("express");
//Création d'un router Express qui contient toutes les routes des requêtes User
const router = express.Router();
//Importation du controller
const userCtrl = require("../controllers/user");


//Requête POST pour inscription
router.post("/signup", userCtrl.validate("signup"), userCtrl.signup); 

//Requête POST pour connexion
router.post("/login", userCtrl.validate("login"), userCtrl.login);

//Requête GET pour connexion
router.get("/:id", userCtrl.getOneUser);

//Requête DELETE pour suppression de compte
router.delete("/:id", userCtrl.deleteAccount);

//Exportation du router
module.exports = router;
