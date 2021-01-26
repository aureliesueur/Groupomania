//Importation du plugin mysql 
var mysql = require("mysql");

//Constructeur
const Comment = function(comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.user_id = comment.user_id;
    this.article_id = comment.article_id;
    this.date_post = new Date();
    this.deleted = comment.deleted
};

//Exportation du modèle de données
module.exports = Comment;