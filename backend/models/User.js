//Importation du module mysql
var mysql = require("mysql");

//Constructeur
const User = function(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
};

//Exportation du modèle de données
module.exports = User;


