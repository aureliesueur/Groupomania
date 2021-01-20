//Importation du plugin mysql 
var mysql = require("mysql");

//Constructeur
const Comment = function(comment) {
    this.id = comment.id;
    this.title = comment.title;
    this.description = comment.description;
    this.subject = comment.subject;
    this.image = comment.image;
    this.user_id = comment.user_id;
    this.date_post = new Date();
};

//Exportation du modèle de données
module.exports = Comment;