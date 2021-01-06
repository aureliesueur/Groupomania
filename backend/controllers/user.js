/*LOGIQUE METIER POUR CE QUI CONCERNE L'AUTHENTIFICATION DES USERS */

//Importation du fichier de configuration de la connection à MySQL
var db = require("../services/mysql.config.js");
//Importation du modèle User
const User = require("../models/User");
//Importation du package de cryptage des mots de passe
const bcrypt = require("bcrypt");
//Importation du package qui permet de créer et de vérifier les tokens d'authentification 
const jwt = require("jsonwebtoken");


//Fonction qui gère la logique métier de la route POST (inscription d'un nouvel user)
exports.signup = (req, res, next) => {
    //Cryptage du password
    bcrypt.hash(/*req.body.password*/'pitchandco09', 10)
        .then(hash => {
            //Création d'un nouvel utilisateur
            const user = new User({
                username: 'Loulouthegreat',//req.body.username,
                email: 'max.barry@free.fr',//req.body.email,
                password: hash,
                first_name: 'Maxime',//req.body.first_name,
                last_name: 'Barry'//req.body.last_name  
            });
            //Enregistrement du new user dans la base de données
            let sql = `INSERT INTO Users(username, email, password, first_name, last_name) VALUES (?)`;
            let values = [user.username, user.email, user.password, user.first_name, user.last_name];
            db.query(sql, [values], function(err, data, fields) {
                if (err) {
                    return res.status(400).json({err}); 
                }
                res.json({status: 200, data, message: "Utilisateur créé !"});
            });
        })
        .catch(error => res.status(500).json({error})); 
};


//Fontion qui gère la logique métier de la route POST (connexion d'un user existant dans la database)
exports.login = (req, res, next) => {
    //Recherche de l'utilisateur dans la DB via son email 
    db.query(`SELECT * FROM Users WHERE email = ?`, [/*req.body.email*/'max.barry@free.fr'], function(err, data, fields) {
        if (err) {
            return res.status(400).json({err: "Utilisateur non trouvé !"}); 
        }
        console.log(data[0].id, data[0].password);
       //Si on a trouvé le mail dans la DB, on compare le hash du nouveau mot de passe au hash de la DB
        bcrypt.compare(/*req.body.password*/'pitchandco09', data[0].password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: "Mot de passe incorrect !"});
                }
                res.status(200).json({
                    userId: data[0].id,
                    //Encodage d'un nouveau token
                    token: jwt.sign(
                        {userId : data.id},
                        "DD49869BBAD47",
                        {expiresIn: "24h"}
                    )
                });
            })
            .catch(error => res.status(500).json({error}));      
    });
};
    
    
  //Fontion qui gère la logique métier de la route DELETE (suppression d'un compte user existant dans la database)
exports.deleteAccount = (req, res, next) => {
    db.query(`DELETE FROM Users WHERE id = ?`, [/*req.body.id*/'Loulouthegreat'], function(err, data, fields) {
        if (err) {
            return res.status(400).json({err: "Désolé, votre demande de suppression de compte n'a pu aboutir."}); 
        }
        res.json({status: 200, data, message: "Votre compte a bien été supprimé !"});    
    });
};
    
//Si ne fontionne pas avec req.body.username, utiliser le token pour retrouver l'id : 
/*//Récupération du token contenu dans les headers
const token = req.headers.authorization.split(" ")[1];
//Décodage du token
const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
//Extraction de l'id contenu dans le token
const userId = decodedToken.userId;
*/
  