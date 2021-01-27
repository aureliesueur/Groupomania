/*LOGIQUE ROUTE POUR CE QUI CONCERNE LES REQUETES SUR LES LIKES/DISLIKES */

const express = require("express");
//Création d'un router Express qui contient toutes les routes des requêtes "Comments"
const router = express.Router({ mergeParams: true });
//Importation du middleware d'authentification pour protéger les routes
const auth = require("../middleware/auth");
//Importation du controller
const thumbCtrl = require("../controllers/thumb");


//Requête POST pour liker un article
router.post("/", /*auth, /*articleCtrl.validate("createComment"),*/ thumbCtrl.sendThumb); 


/*//Requête PUT pour modifier un commentaire déjà posté
router.put("/:cryptoslug", auth, /*articleCtrl.validate("modifyArticle"), commentCtrl.modifyComment); 

//Requête DELETE pour supprimer un commentaire qu'on a posté
router.delete("/:cryptoslug", auth, commentCtrl.deleteComment); 
*/

//Requête GET pour afficher tous likes et dislikes d'un article
router.get("/thumbs", /*auth, */thumbCtrl.getAllThumbs); 


//Exportation du router
module.exports = router;


