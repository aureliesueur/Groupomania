/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES COMMENTAIRES POSTES A PROPOS D'UN ARTICLE */


//Importation du modèle Comment
const Comment = require("../models/Comment"); 
//Importation du fichier de configuration de la connection à MySQL
var db = require("../services/mysql.config.js");
//Importation du package fs, qui permet entre autres de supprimer des fichiers
//const fs = require("fs");
//Importation du middleware de vérification des inputs par express-validator 
//const {body} = require('express-validator');

//Fonction de validation des inputs pour les requêtes post et put
/*exports.validate = (method) => {
  switch (method) {
    case 'createComment': {
     return [ 
        body('content').exists().isAlpha(),
        body('note').optional().isInt(),
        body('user_id').exists().isInt(),
        body('article_id').exists().isInt(),
        body('date_post').exists().isDate(),
       ]   
    }
    case 'modifyComment': {
     return [ 
        body('content').exists().isAlpha(),
        body('note').optional().isInt(),
        body('user_id').exists().isInt(),
        body('article_id').exists().isInt(),
        body('date_post').exists().isDate(),
       ]   
    }  
  }
}*/


//Fontion qui gère la logique métier de la route POST (ajout d'un nouveau comment)
exports.createComment = (req, res, next) => {
    let articleId = 3; //req.url.split("/")[5]; 
    let sql = `INSERT INTO Comments(content, note, user_id, article_id, date_post) VALUES (?)`;
    let values = [req.body.content, req.body.note, req.body.user_id, articleId, req.body.date_post];
    db.query(sql, [values], function(err, data, fields) {
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Nouveau commentaire posté avec succès !"})
    });
};


//Fontion qui gère la logique métier de la route PUT (modification d'un comment posté par son auteur)
 exports.modifyComment = (req, res, next) => {
    let articleId = 3; 
    let sql = `UPDATE Comments SET content = ?, note = ?, user_id = ?, article_id = ?, date_post = ? WHERE id = ?`;
    let values = [req.body.content, req.body.note, req.body.user_id, articleId, req.body.date_post, req.params.id]
    db.query(sql, values, function(err, data, fields) {
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Commentaire modifié !"})
    });
}; 

      
//Fontion qui gère la logique métier de la route DELETE (suppression d'un commentaire posté)
exports.deleteComment = (req, res, next) => {
  let sql = "DELETE FROM Comments WHERE id = ?";
  db.query(sql, [req.params.id], function(err, data) {
    if (err) {
        return res.status(400).json({err});
    }
    res.json({status: 200, data, message: "Commentaire supprimé !"})
  });
};


//Fontion qui gère la logique métier de la route GET (affichage de tous les articles)
exports.getAllComments = (req, res, next) => { 
    let articleId = 3; //req.url.split("/")[3]; 
    let sql = "SELECT Comments.id, content, note, Comments.date_post, username, Articles.title FROM Comments INNER JOIN Users ON Comments.user_id = Users.id INNER JOIN Articles ON Comments.article_id = Articles.id WHERE Articles.id = ?"; 
    db.query(sql, [articleId], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        } 
        res.json({status: 200, data, message: "Commentaires affichés avec succès !"})
    });
};


//Fontion qui gère la logique métier de la route GET (affichage d'un article en particulier)
exports.getOneComment = (req, res, next) => {
    let requestArray = req.url.split("/");
    let requestDecodedArray = requestArray.map((el)=>decodeURIComponent(el));
    let articleId = requestDecodedArray[3]; 
    let values = [articleId, req.params.id];
    let sql = "SELECT Comments.id, content, note, Comments.date_post, username, Articles.title FROM Comments INNER JOIN Users ON Comments.user_id = Users.id INNER JOIN Articles ON Comments.article_id = Articles.id WHERE Articles.id= ? AND Comments.id = ?";
    db.query(sql, values, function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "Commentaire affiché avec succès !"})
  });
};


