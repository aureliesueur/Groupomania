/* Structuration des données "thumbs" (likes/dislikes) dans la base de données MySQL */

//Importation du plugin mysql 
var mysql = require("mysql");

//Constructeur
const Thumb = function(like) {
    this.id = thumb.id;
    this.user_id = thumb.user_id;
    this.article_id = thumb.article_id;
    this.thumb = thumb.thumb;
    this.liked = thumb.liked;
    this.disliked = thumb.disliked;
};

//Exportation du modèle de données
module.exports = Thumb;