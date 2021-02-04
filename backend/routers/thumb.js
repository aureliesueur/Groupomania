/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES LIKES/DISLIKES */

const express = require("express");
//Création d'un router Express qui contient toutes les routes des requêtes "Comments"
const router = express.Router({ mergeParams: true });
//Importation du middleware d'authentification pour protéger les routes
const auth = require("../middleware/auth");
//Importation du controller
const thumbCtrl = require("../controllers/thumb");


//Requête POST pour envoyer un like ou un dislike sur un article
router.post("/thumbs", auth, thumbCtrl.sendThumb); 

//Requête DELETE pour supprimer le like ou le dislike qu'on a posté
router.delete("/thumbs", auth, thumbCtrl.deleteThumb); 

//Requête GET pour afficher tous les likes et dislikes d'un article
router.get("/thumbs", auth, thumbCtrl.getAllThumbs); 

//Requête GET pour afficher le like ou le dislike d'un user sur un article
router.get("/thumbs/user", auth, thumbCtrl.getUserThumb); 

//Exportation du router
module.exports = router;


