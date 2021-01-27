/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES COMMENTAIRES POSTES A PROPOS D'UN ARTICLE */


//Importation du modèle Comment
const Comment = require("../models/Comment"); 
//Importation du fichier de configuration de la connection à MySQL
var db = require("../services/mysql.config.js");
//Importation du package fs, qui permet entre autres de supprimer des fichiers
//const fs = require("fs");
//Importation du middleware de vérification des inputs par express-validator 
//const {body} = require('express-validator');
//Importation du plugin qui permet de créer un slug à partir du titre de l'article
var slugify = require("slugify");
//Importation du plugin qui permet de créer un slug aléatoire pour chaque comment
var cryptoRandomString = require('crypto-random-string');

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
    let sql = `INSERT INTO Comments(cryptoslug, content, user_id, article_id, date_post) VALUES (?)`;
    let newSlug = cryptoRandomString({length: 5});;
    let values = [newSlug, req.body.content, req.body.user_id, req.body.article_id, req.body.date_post];
    db.query(sql, [values], function(err, data, fields) {
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Nouveau commentaire posté avec succès !"})
    });
};


//Fontion qui gère la logique métier de la route PUT (modification d'un comment posté par son auteur)
 exports.modifyComment = (req, res, next) => {
    //Recherche dans la BDD du commentaire à modifier
    let sql = "SELECT * FROM Comments WHERE cryptoslug = ?";
    db.query(sql, [req.params.cryptoslug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var commentToModify = data[0];
        console.log(commentToModify);
        //Comparaison de l'id du user courant avec l'id du user ayant posté le commentaire
        if (commentToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
            let sql = `UPDATE Comments SET content = ?, user_id = ?, date_post = ? WHERE cryptoslug = ?`;
            let values = [req.body.content, req.body.user_id, req.body.date_post, req.params.cryptoslug]
            db.query(sql, values, function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Commentaire modifié !"})
            });
        } else {
            throw "La modification du commentaire n'est possible que par son auteur.";
        }
    });
}; 
    

//Fontion qui gère la logique métier de la route DELETE (suppression d'un commentaire posté)
exports.deleteComment = (req, res, next) => {
    let sql = "SELECT * FROM Comments WHERE cryptoslug = ?";
    db.query(sql, [req.params.cryptoslug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var commentToModify = data[0];
        console.log(commentToModify);
        //Comparaison de l'id du user courant avec l'id du user ayant posté le commentaire
        if (commentToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
            let sql = "UPDATE Comments SET deleted = true WHERE Comments.cryptoslug = ?";
            db.query(sql, [req.params.cryptoslug], function(err, data) {
                if (err) {
                return res.status(400).json({err});
                }
            res.json({status: 200, data, message: "Commentaire supprimé !"})
            });
        } else {
            throw "La suppression du commentaire n'est possible que par son auteur.";
        }
    });
};



//Fontion qui gère la logique métier de la route GET (affichage de tous les articles)
exports.getAllComments = (req, res, next) => { 
    let articleSlug = req.params.slug; 
    let sql = "SELECT Comments.id, Comments.cryptoslug, Comments.user_id, content, Comments.date_post, username, Articles.title, Articles.slug FROM Comments INNER JOIN Users ON Comments.user_id = Users.id INNER JOIN Articles ON Comments.article_id = Articles.id WHERE Articles.slug = ? AND Comments.deleted = false ORDER BY Comments.date_post DESC"; 
    db.query(sql, [articleSlug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        } 
        res.json({status: 200, data, message: "Commentaires affichés avec succès !"})
    });
};


//Fontion qui gère la logique métier de la route GET (affichage d'un article en particulier)
exports.getOneComment = (req, res, next) => {
    let commentSlug = req.params.cryptoslug; 
    let sql = "SELECT Comments.id, Comments.cryptoslug, Comments.user_id, content, Comments.date_post, username, Articles.slug FROM Comments INNER JOIN Users ON Comments.user_id = Users.id INNER JOIN Articles ON Comments.article_id = Articles.id WHERE Comments.cryptoslug = ?";
    db.query(sql, commentSlug, function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    console.log(data);
    res.json({status: 200, data, message: "Commentaire affiché avec succès !"})
  });
};





