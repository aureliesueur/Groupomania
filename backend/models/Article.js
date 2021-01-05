//const sql = require("./mysql.config.js");

var mysql = require("mysql");

//Constructeur
const Article = function(article) {
    this.id = article.id;
    this.title = article.title;
    this.description = article.description;
    this.subject = article.subject;
    this.image = article.image;
    this.user_id = article.user_id;
    this.date_post = article.date_post;
};

module.exports = Article;