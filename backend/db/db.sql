DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE IF NOT EXISTS groupomania;
USE groupomania;

SET NAMES utf8;

/*Reset rapide en cas d'erreur*/
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS Comments;

/*Création de la table des utilisateurs, avec id, pseudo, mail, password, nom et prénom */
CREATE TABLE Users (
    id SMALLINT UNSIGNED NOT NULL  AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des articles postés, avec id, titre, description, sujet (pour classement des posts), auteur, date du post, et éventuellement photo de l'article */
CREATE TABLE Articles (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) UNIQUE,
    description TEXT,
    subject VARCHAR(50) NOT NULL,
    lien_web VARCHAR(400),
    imageURL VARCHAR(100),
    user_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des commentaires, avec id, titre et description, article et auteur associés */
CREATE TABLE Comments (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(300),
    note SMALLINT UNSIGNED,
    user_id SMALLINT UNSIGNED NOT NULL,
    article_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;

INSERT INTO Users VALUES 
    (1, 'Bambi', 'aureliesueur@wanadoo.fr', 'bambi01as', 'Aurélie', 'Sueur'),
    (2, 'Chipolata', 'pauline.amartin@free.fr', 'figaro22', 'Pauline', 'Amartin'),
    (3, 'Pussicat', 'francedesmarais@gmail.com', 'bidibul65', 'France', 'Desmarais'),
    (4, 'Barbu55', 'guillaume.voisin@orange.fr', 'mouflon00', 'Guillaume', 'Voisin');
    
INSERT INTO Articles VALUES 
    (1, 'Nos coups de coeur', 'Haec ubi latius fama vulgasset missaeque relationes adsiduae Gallum Caesarem permovissent, quoniam magister equitum longius ea tempestate distinebatur, iussus comes orientis Nebridius contractis.', 'Sports', 'https://wrex.com/2021/01/05/family-video-to-close-all-remaining-locations/?fbclid=IwAR0noxFLpSdMIeRraoU9L33B-rzz91xOkp3Fw53nbyKcNXEjlHNc4nO-xOs', NULL, 2, '2020-12-21'),
    (2, 'L''actu', 'Undique militaribus copiis ad eximendam periculo civitatem amplam et oportunam studio properabat ingenti, quo cognito abscessere latrones nulla re amplius memorabili gesta, dispersique ut solent avia montium petiere celsorum.', 'Medias', 'https://www.vox.com/platform/amp/2021/1/6/22213094/jon-ossoff-beats-david-perdue-georgia-senate-election?utm_campaign=vox&utm_content=chorus&utm_medium=social&utm_source=twitter&__twitter_impression=true', NULL, 4, '2020-12-17'),
    (3, 'Atout prendre', 'Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni.', 'Culture', 'https://showme.missouri.edu/2021/facebook-posts-help-facilitate-belief-that-hpv-vaccine-is-dangerous-to-health/', NULL, 3, '2020-11-23'),
    (4, 'La vie d''avant', 'Nihil morati post haec militares avidi saepe turbarum adorti sunt Montium primum, qui divertebat in proximo, levi corpore senem atque morbosum, et hirsutis resticulis cruribus eius innexis divaricaturn sine spiramento ullo ad usque praetorium traxere praefecti.', 'Politique', NULL, NULL, 3, '2020-11-09');
        
INSERT INTO Comments VALUES 
    (1, 'Formidable', 'Absolument génial, à lire !!', 18, 2, 1, '2021-01-01'),
    (2, 'Nul', 'A EVITER !!', 5, 1, 2, '2021-01-02'),
    (3, 'Pas mal', 'Mais manque de matière... Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem.', 12, 2, 3, '2021-01-01'),
    (4, 'Intéressant', 'Un point de vue original !', 15, 1, 3, '2021-01-03'),
    (5, 'Bof', 'Vu et revu cent fois... Haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum.', 7, 4, 4, '2020-12-21'),
    (6, 'Passionnant, bravo !', 'A accrocher sur son frigo et à relire tous les jours...', 18, 1, 4, '2020-12-18');
    
ALTER TABLE Articles ADD CONSTRAINT fk_article_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Comments ADD CONSTRAINT fk_comment_article FOREIGN KEY (article_id) REFERENCES Articles(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Comments ADD CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;
