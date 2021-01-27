/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES LIKES/DISLIKES */


//Importation du modèle Thumb 
const Thumb = require("../models/Thumb"); 
//Importation du fichier de configuration de la connection à MySQL
var db = require("../services/mysql.config.js");
//Importation du middleware de vérification des inputs par express-validator 
const {body} = require('express-validator');
//Importation du package qui permet de créer et de vérifier les tokens d'authentification 
const jwt = require("jsonwebtoken");



//Fontion qui gère la logique métier de la route POST (envoi d'un nouveau like ou dislike). Si thumb=1, le like est enregistré, si thumb=-1, le dislike est enregistré.
exports.sendThumb = (req, res, next) => {
     //Recherche dans la BDD l'id de l'article concerné par les thumbs
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        var articleId = data[0].id;
        let sql = `INSERT INTO Thumbs(user_id, article_id, thumb, liked, disliked) VALUES (?)`;
        let values = [req.body.user_id, articleId, req.body.thumb, (req.body.thumb == 1 ? 1:0), (req.body.thumb == -1 ? 1:0)];
        db.query(sql, [values], function(err, data, fields) {
            if (err) {
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: "Nouveau like/dislike enregistré avec succès !"})
        });
    });
};
    
 
//Fontion qui gère la logique métier de la route GET (affichage de tous les likes et dislikes)  
exports.getAllThumbs = (req, res, next) => {
    //Recherche dans la BDD l'id de l'article concerné par les thumbs
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        var articleId = data[0].id;
        let sql = "SELECT SUM(liked), SUM(disliked) FROM Thumbs WHERE article_id = ?"; 
        db.query(sql, [articleId], function(err, data) {
            if (err) {
                return res.status(400).json({err});
            } 
            res.json({status: 200, data, message: "Likes/dislikes affichés avec succès !"})
          });
    });
};  