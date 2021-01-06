/*LOGIQUE METIER POUR CE QUI CONCERNE LES REQUETES SUR LES ARTICLES POSTES */


//Importation du modèles Article 
const Article = require("../models/Article"); 

var db = require("../services/mysql.config.js");

//Importation du package fs, qui permet entre autres de supprimer des fichiers
//const fs = require("fs");


//Fontion qui gère la logique métier de la route POST (ajout d'un nouvel article)
exports.createArticle = (req, res, next) => {
  let sql = `INSERT INTO Articles(title, description, subject, lien_web, imageURL, user_id, date_post) VALUES (?)`;
  let values = ['2021, année succès', 'Après une année difficile, 2021 promet une belle croissance économique', 'Economie', 'https://pro.orange.fr/actualites/nicaragua-naissance-dans-un-zoo-d-une-petite-tigresse-blanche-CNT000001w4hAK.html', 'NULL', 2, '2020-12-20'
    /*req.body.title,
    req.body.description,
    req.body.subject,
    req.body.imageURL,
    req.body.user_id,
    req.body.date_post*/
    ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) {
        throw err;
    }
    res.json({status: 200, data, message: "Nouvel article posté avec succès !"})
  });
};


//Fontion qui gère la logique métier de la route GET (affichage de tous les articles)
exports.getAllArticles = (req, res, next) => {
  db.query("SELECT * FROM Articles", function(err, data) {
    if (err) {
        throw err;
    }
    res.json({status: 200, data, message: "Articles affichés avec succès !"})
  });
};


//Fontion qui gère la logique métier de la route GET (affichage d'un article en particulier)
exports.getOneArticle = (req, res, next) => {
  db.query("SELECT * FROM Articles WHERE id = ?", [3 /*req.param.id*/], function(err, data) {
    if (err) {
        throw err;
    }
    res.json({status: 200, data, message: "Article affiché avec succès !"})
  });
};


//Fontion qui gère la logique métier de la route PUT (modification d'un article posté par son auteur)
 exports.modifyArticle = (req, res, next) => {
    let sql = `UPDATE Articles SET title = ?, description = ?, subject = ?, imageURL = ?, user_id = ?, date_post = ? WHERE id = ?`;
    let values = ['Embrassons-nous', 'Le Covid est responsable de davantage de solitude affective', 'Société', 'NULL', 'NULL', 1, '2020-11-20', 2];
    /*req.body.title,
    req.body.description,
    req.body.subject,
    req.body.image,
    req.body.user_id,
    req.body.date_post
    req.param.id
    */
    db.query(sql, values, function(err, data, fields) {
        if (err) {
            throw err;
        }
        res.json({status: 200, data, message: "Article modifié avec succès !"})
    });
}; 


//Fontion qui gère la logique métier de la route DELETE (suppression d'un article posté)
exports.deleteArticle = (req, res, next) => {
  db.query("DELETE FROM Articles WHERE id = ?", [5 /*req.param.id*/], function(err, data) {
    if (err) {
        throw err;
    }
    res.json({status: 200, data, message: "Article supprimé avec succès !"})
  });
};



/*
//Fontion qui gère la logique métier de la route PUT (modification d'une sauce existante)
exports.modifySauce = (req, res, next) => {
    //Création d'un objet réponse qu'on interroge pour savoir s'il y a un fichier image à télécharger ou non
    const sauceObject = req.file ?
        {
        //Si oui, on récupère la partie "sauce" de l'objet réponse qu'on met en json
        ...JSON.parse(req.body.sauce),
        //Expression dynamique pour recréer l'adresse url pour trouver le fichier téléchargé récupéré par multer
            imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        //Si non, on récupère directement le body de la requête
        } : {...req.body};
    //On met à jour en remplaçant les données mais en gardant le même id
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message : "Sauce modifiée !"}))
        .catch(error => res.status(400).json({error}));
};

//Fontion qui gère la logique métier de la route DELETE (suppression d'une sauce existante)
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
        //Récupération du nom de fichier à la fin de l'URL
        const filename = sauce.imageUrl.split("/images/")[1];
        //Suppression du fichier image stocké par multer via une expression dynamique
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message : "Sauce supprimée !"}))
                .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(500).json({error}));
};
*/