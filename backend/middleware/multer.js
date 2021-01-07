/*MIDDLEWARE DE TELECHARGEMENT D'IMAGE */

//Importation du package multer, qui permet le téléchargement de fichiers
const multer = require("multer");

//Dictionnaire d'extensions possibles pour les images
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

//Création d'un objet de configuration pour multer
const storage = multer.diskStorage({
    //Fonction qui définit où iront les fichiers téléchargés
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    //Création d'un nom de fichier unique
    filename: (req, file, callback) => {
        //On prend le nom de la photo en enlevant les espaces
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        //Création nom final en ajoutant timestamp et extension
        callback(null, name + Date.now() + "." + extension);
    }
});

//Exportation de multer, en précisant qu'on stocke un fichier unique et non un groupe, et qu'il s'agit d'une image
module.exports = multer({storage}).single("image");

