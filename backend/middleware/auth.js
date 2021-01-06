/*MIDDLEWARE D'AUTHENTIFICATION */

//Importation du package qui permet de créer et de vérifier les tokens d'authentification 
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        //Récupération du token contenu dans les headers
        const token = req.headers.authorization.split(" ")[1];
        //Décodage du token
        const decodedToken = jwt.verify(token, "DD49869BBAD47");
        //Extraction de l'id contenu dans le token
        const userId = decodedToken.userId;
        if (req.body.user_id && req.body.user_id !== userId) {
            throw "User ID non valable !";
        } else {
            next();
        }
    } 
    catch {
       res.status(401).json({error: new Error("Requête non authentifiée !")}); 
    }  
};

        