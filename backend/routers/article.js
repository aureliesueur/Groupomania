/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES ARTICLES POSTES */

const express = require("express");
//Création d'un router Express qui contient toutes les routes des requêtes "Articles"
const router = express.Router();
//Importation du middleware d'authentification pour protéger les routes et donner les autorisations aux users selon leur rôle et leur id
const auth = require("../middleware/auth");
//Importation du controller
const articleCtrl = require("../controllers/article");


//Requête POST pour poster un nouvel article sur le réseau social
router.post("/add", auth, articleCtrl.validate("createArticle"), articleCtrl.createArticle); 

//Requête PUT pour modifier un article déjà posté
router.put("/:id", auth, articleCtrl.validate("modifyArticle"), articleCtrl.modifyArticle); 

//Requête DELETE pour supprimer un article qu'on a posté
router.delete("/:id", auth, articleCtrl.deleteArticle); 

//Requête GET pour afficher tous les articles postés
router.get("/", auth, articleCtrl.getAllArticles); 

//Requête GET pour afficher un article en particulier
router.get("/:id", auth, articleCtrl.getOneArticle); 

//Exportation du router
module.exports = router;




