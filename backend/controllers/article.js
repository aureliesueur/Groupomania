/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES ARTICLES POSTES */


//Importation du modèle Article 
const Article = require("../models/Article"); 
//Importation du fichier de configuration de la connection à MySQL
var db = require("../services/mysql.config.js");
//Importation du middleware de vérification des inputs par express-validator 
const {body} = require('express-validator');
//Importation du package qui permet de créer et de vérifier les tokens d'authentification 
const jwt = require("jsonwebtoken");
//Importation du plugin qui permet de créer un slug à partir du titre de l'article
var slugify = require("slugify");

//Fonction de validation des inputs pour les requêtes post et put
exports.validate = (method) => {
  switch (method) {
    case 'createArticle': {
     return [ 
        body('title').exists().isAlpha(),
        body('description').optional().isAlpha(),
        body('subject').exists().isAlpha(),
        body('lien_web').optional().isURL(),
        body('date_post').exists().isDate(),
       ]   
    }
    case 'modifyArticle': {
     return [ 
        body('title').exists().isAlpha(),
        body('description').optional().isAlpha(),
        body('subject').exists().isAlpha(),
        body('lien_web').optional().isURL(),
        body('date_post').exists().isDate(),
       ]   
    }  
  }
}

//Fontion qui gère la logique métier de la route POST (ajout d'un nouvel article)
exports.createArticle = (req, res, next) => {
    let sql = `INSERT INTO Articles(title, slug, description, subject, lien_web, user_id, date_post) VALUES (?)`;
    let newSlug = slugify(req.body.slug, { lower: true });
    let values = [req.body.title, newSlug, req.body.description, req.body.subject, req.body.lien_web, req.body.user_id, req.body.date_post];
    db.query(sql, [values], function(err, data, fields) {
        if (err) {
            return res.status(400).json({err});
        }
        res.json({status: 201, data, message: "Nouvel article posté avec succès !"})
    });
};
 
 //Fontion qui gère la logique métier de la route PUT (modification d'un article posté par son auteur)
 /*exports.modifyArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à modifier
    console.log(req.params.slug);
    //console.log(JSON.parse(JSON.stringify(req.params.slug)));
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    let value = [JSON.parse(req.params.slug)];
    db.query(sql, [value], function(err, data) {
     //db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        console.log(articleToModify);
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
        if (articleToModify.user_id === req.body.user_id) {//} || req.user.isAdmin === 1) {
            let newSlug = slugify(req.body.title, { lower: true }); 
            let sql = `UPDATE Articles SET title = ?, slug = ?, description = ?, subject = ?, lien_web  = ?, user_id = ?, date_post = ? WHERE id = ?`;
            let values = [req.body.title, newSlug, req.body.description, req.body.subject, req.body.lien_web, req.body.user_id, req.body.date_post, articleToModify.id];
            db.query(sql, values, function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Article modifié avec succès !"})
            });
        } else {
            throw "La modification de l'article n'est possible que par son auteur.";
        }
    });
 }
 */

 
//Fontion qui gère la logique métier de la route PUT (modification d'un comment posté par son auteur)
 exports.modifyArticle = (req, res, next) => {
     //Recherche dans la BDD de l'article à modifier
    console.log(req.params.slug);
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        console.log(articleToModify);
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article'
        if (articleToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
            let sql = `UPDATE Articles SET title = ?, description = ?, subject = ?, lien_web  = ?, user_id = ?, date_post = ? WHERE slug = ?`;
            let values = [req.body.title, req.body.description, req.body.subject, req.body.lien_web, req.body.user_id, req.body.date_post, req.params.slug];
            db.query(sql, values, function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Article modifié !"})
            });
        } else {
            throw "La modification de l'article n'est possible que par son auteur.";
        }
    });
}; 

 /*
exports.modifyArticle = (req, res, next) => {
     //Recherche dans la BDD de l'article à modifier
    let sql = "SELECT * FROM Articles WHERE id = ?";
    console.log(req.params.id);
    db.query(sql, [req.params.id], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        console.log(articleToModify);
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
        if (articleToModify.user_id === req.body.user_id) {
            //let newSlug = slugify(req.body.slug, { lower: true });
            let sql = `UPDATE Articles SET title = ?, description = ?, subject = ?, lien_web  = ?, user_id = ?, date_post = ? WHERE id = ?`;
            let values = [req.body.title, req.body.description, req.body.subject, req.body.lien_web, req.body.user_id, req.body.date_post, req.params.id];
            db.query(sql, values, function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 201, data, message: "Article modifié avec succès !"})
            });
        } else {
            throw "La modification de l'article n'est possible que par son auteur.";
        }
    });
 }
 */
        
//Fontion qui gère la logique métier de la route DELETE (suppression d'un article posté)
exports.deleteArticle = (req, res, next) => {
    //Recherche dans la BDD de l'article à modifier
    console.log(req.params.slug);
    let sql = "SELECT * FROM Articles WHERE slug = ?";
    db.query(sql, [req.params.slug], function(err, data) {
        if (err) {
            return res.status(400).json({err});
        }
        var articleToModify = data[0];
        console.log(articleToModify);
        //Comparaison de l'id du user courant avec l'id du user ayant posté l'article
        if (articleToModify.user_id === req.user.userId || req.user.isAdmin === 1) {
              let sql = "UPDATE Articles SET deleted = true WHERE slug = ?";
              db.query(sql, [req.params.slug], function(err, data) {
                if (err) {
                    return res.status(400).json({err});
                }
                res.json({status: 200, data, message: "Article supprimé avec succès !"})
              });
        } else {
            throw "La suppression de l'article n'est possible que par son auteur.";
        }
    });
};


//Fontion qui gère la logique métier de la route GET (affichage de tous les articles)
exports.getAllArticles = (req, res, next) => {
  let sql = "SELECT Articles.id, title, slug, description, subject, lien_web, date_post, username FROM Articles INNER JOIN Users ON Articles.user_id = Users.id WHERE Articles.deleted = false ORDER BY date_post DESC"; 
  db.query(sql, function(err, data) {
    if (err) {
        return res.status(400).json({err});
    } 
    res.json({status: 200, data, message: "Articles affichés avec succès !"})
  });
};


//Fontion qui gère la logique métier de la route GET (affichage d'un article en particulier)
exports.getOneArticle = (req, res, next) => {
    let sql = "SELECT Articles.id, title, slug, description, subject, lien_web, date_post, username, user_id FROM Articles INNER JOIN Users ON Articles.user_id = Users.id WHERE Articles.slug = ?";
    db.query(sql, [req.params.slug], function(err, data, fields) {
    if (err) {
        return res.status(404).json({err});
    }
    res.json({status: 200, data, message: "Article affiché avec succès !"})
  });
};



