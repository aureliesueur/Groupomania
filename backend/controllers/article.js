/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES ARTICLES POSTES */


//Importation du modèles Article 
const Article = require("../models/Article"); 
//Importation du fichier de configuration de la connection à MySQL
var db = require("../services/mysql.config.js");
//Importation du package fs, qui permet entre autres de supprimer des fichiers
//const fs = require("fs");
//Importation du middleware de vérification des inputs par express-validator 
const {body} = require('express-validator');

//Fonction de validation des inputs pour les requêtes post et put
exports.validate = (method) => {
  switch (method) {
    case 'createArticle': {
     return [ 
        body('title').optional().isAlpha(),
        body('description').optional().isAlpha(),
        body('subject').exists().isAlpha(),
        body('lien_web').optional().isURL(),
        body('imageURL').optional().isURL(),
        body('user_id').exists().isInt(),
        body('date_post').exists().isDate(),
       ]   
    }
    case 'modifyArticle': {
     return [ 
        body('title').optional().isAlpha(),
        body('description').optional().isAlpha(),
        body('subject').exists().isAlpha(),
        body('lien_web').optional().isURL(),
        body('imageURL').optional().isURL(),
        body('user_id').exists().isInt(),
        body('date_post').exists().isDate(),
       ]   
    }  
  }
}

//Fontion qui gère la logique métier de la route POST (ajout d'un nouvel article)
exports.createArticle = (req, res, next) => {
  let sql = `INSERT INTO Articles(title, description, subject, lien_web, imageURL, user_id, date_post) VALUES (?)`;
  let values = [req.body.title, req.body.description, req.body.subject, req.body.lien_web, req.body.imageURL, req.body.user_id, req.body.date_post];
  db.query(sql, [values], function(err, data, fields) {
    if (err) {
        return res.status(400).json({err});
    }
    res.json({status: 201, data, message: "Nouvel article posté avec succès !"})
  });
};


//Fontion qui gère la logique métier de la route PUT (modification d'un article posté par son auteur)
 exports.modifyArticle = (req, res, next) => {
    let sql = `UPDATE Articles SET title = ?, description = ?, subject = ?, lien_web  = ?, imageURL = ?, user_id = ?, date_post = ? WHERE id = ?`;
    let values = [req.body.title, req.body.description, req.body.subject, req.body.lien_web, req.body.imageURL, req.body.user_id, req.body.date_post, req.params.id]
    db.query(sql, values, function(err, data, fields) {
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Article modifié avec succès !"})
    });
}; 

/*
//Fontion qui gère la logique métier de la route PUT (modification d'un article posté par son auteur) AVEC AUTHENTIFICATION AUTEUR
exports.modifyArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à modifier
    let sql = "SELECT FROM Articles WHERE id = ?";
    db.query(sql, [req.params.id], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        return articleToModify;
    });
    //Récupération du token contenu dans les headers
    const token = req.headers.authorization.split(" ")[1];
    //Décodage du token
    const decodedToken = jwt.verify(token, "DD49869BBAD47");
    //Extraction de l'id contenu dans le token
    const userId = decodedToken.userId;
    //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
    if (articleToModify.user_id !== userId) {
        throw "La modification de l'article n'est possible que par son auteur.";
    } else {
        //Mise à jour de l'article avec nouveaux inputs
        let sql = `UPDATE Articles SET title = ?, description = ?, subject = ?, lien_web  = ?, imageURL = ?, user_id = ?, date_post = ? WHERE id = ?`;
        let values = [req.body.title, req.body.description, req.body.subject, req.body.lien_web, req.body.imageURL, req.body.user_id, req.body.date_post, req.params.id]
        db.query(sql, values, function(err, data, fields) {
            if (err) {
                return res.status(400).json({err});
            }
            res.json({status: 201, data, message: "Article modifié avec succès !"})
        });
    }
 };
 */
        
        
//Fontion qui gère la logique métier de la route DELETE (suppression d'un article posté)
exports.deleteArticle = (req, res, next) => {
  let sql = "DELETE FROM Articles WHERE id = ?";
  db.query(sql, [req.params.id], function(err, data) {
    if (err) {
        return res.status(400).json({err});
    }
    res.json({status: 200, data, message: "Article supprimé avec succès !"})
  });
};

/*
//Fontion qui gère la logique métier de la route DELETE (suppression d'un article posté) AVEC VERIFICATION DE L'AUTHENTIFICATION UTILISATEUR
exports.deleteArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à modifier
    let sql = "SELECT FROM Articles WHERE id = ?";
    db.query(sql, [req.params.id], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        return articleToModify;
    });
    //Récupération du token contenu dans les headers
    const token = req.headers.authorization.split(" ")[1];
    //Décodage du token
    const decodedToken = jwt.verify(token, "DD49869BBAD47");
    //Extraction de l'id contenu dans le token
    const userId = decodedToken.userId;
    //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
    if (articleToModify.user_id !== userId) {
        throw "La modification de l'article n'est possible que par son auteur.";
    } else {
        //Suppression de l'article par son auteur
        let sql = "DELETE FROM Articles WHERE id = ?";
        db.query(sql, [req.params.id], function(err, data) {
            if (err) {
                return res.status(400).json({err});
            }
            res.json({status: 200, data, message: "Article supprimé avec succès !"})
        });
    }
};
*/
        

//Fontion qui gère la logique métier de la route GET (affichage de tous les articles)
exports.getAllArticles = (req, res, next) => {
  let sql = "SELECT Articles.id, title, description, subject, lien_web, date_post, username FROM Articles INNER JOIN Users ON Articles.user_id = Users.id"; 
  db.query(sql, function(err, data) {
    if (err) {
        return res.status(400).json({err});
    } 
    res.json({status: 200, data, message: "Articles affichés avec succès !"})
  });
};


//Fontion qui gère la logique métier de la route GET (affichage d'un article en particulier)
exports.getOneArticle = (req, res, next) => {
    let sql = "SELECT Articles.id, title, description, subject, lien_web, date_post, username, user_id FROM Articles INNER JOIN Users ON Articles.user_id = Users.id WHERE Articles.id = ?";
    db.query(sql, [req.params.id], function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "Article affiché avec succès !"})
  });
};



