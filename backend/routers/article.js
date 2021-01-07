/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES ARTICLES POSTES */

const express = require("express");
//Création d'un router Express qui contient toutes les routes des requêtes "Articles"
const router = express.Router();
//Importation du middleware d'authentification pour protéger les routes
const auth = require("../middleware/auth");
//Importation du plugin multer pour le téléchargement d'images/d'articles
const multer = require("../middleware/multer");
//Importation du controller
const articleCtrl = require("../controllers/article");


//Requête POST pour poster un nouvel article sur le réseau social
router.post("/", /*auth, multer,*/ articleCtrl.validate("createArticle"), articleCtrl.createArticle); 

//Requête PUT pour modifier un article déjà posté
router.put("/:id", /*auth, multer,*/ articleCtrl.validate("modifyArticle"), articleCtrl.modifyArticle); 

//Requête DELETE pour supprimer un article qu'on a posté
router.delete("/:id", /*auth, */articleCtrl.deleteArticle); 

//Requête GET pour afficher tous les articles postés
router.get("/", /*auth, */articleCtrl.getAllArticles); 

//Requête GET pour afficher un article en particulier
router.get("/:id", /*auth, */articleCtrl.getOneArticle); 

//Exportation du router
module.exports = router;




