//Importation du package express-validator pour valider les données de connexion
const {check} = require("express-validator");

//Fonction de vérification des inputs user au moment de l'inscription
exports.validateSignup = (req, res, next) => {
    [
    check("username")
        .exists()
        .withMessage("Votre nom d'utilisateur ou pseudo est requis !")
        .isLength({min: 3})
        .withMessage("Votre pseudo est trop court !"),
    check("first_name")
        .exists()
        .withMessage("Merci d'entrer votre prénom !")
        .isAlpha()
        .withMessage("Votre prénom ne doit contenir que des lettres !"),
    check("last_name")
        .exists()
        .withMessage("Merci d'entrer votre nom !")
        .isAlpha()
        .withMessage("Votre nom ne doit contenir que des lettres !"),
    check("email")
        .exists()
        .withMessage("Merci d'entrer votre email !")
        .isEmail()
        .withMessage("Votre email n'est pas valide !")
        .normalizeEmail(),
    check("password")
        .exists()
        .withMessage("Merci d'entrer un mot de passe !")
        .notEmpty()
        .isLength({min: 6})
        .withMessage("Votre mot de passe doit contenir au moins 6 caractères !")
        .isLength({max: 10})
        .withMessage("Votre mot de passe ne doit pas contenir plus de 10 caractères !")    
]};


//Fonction de vérification des inputs user au moment de la connection
exports.validateLogin = [
    check("email")
        .exists()
        .withMessage("Merci d'entrer votre email !")
        .isEmail()
        .withMessage("Votre email n'est pas valide !")
        .normalizeEmail(),
    check("password")
        .exists()
        .withMessage("Votre mot de passe est requis !")
        .notEmpty()
        .withMessage("Merci d'entrer un mot de passe !")    
]