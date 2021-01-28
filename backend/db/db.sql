
DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE IF NOT EXISTS groupomania;
USE groupomania;

SET NAMES utf8;

/*Reset rapide en cas d'erreur*/
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS Thumbs;
DROP TABLE IF EXISTS Comments;

/*Création de la table des utilisateurs, avec id, pseudo, mail, password, nom et prénom */
CREATE TABLE Users (
    id SMALLINT UNSIGNED NOT NULL  AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_admin TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des articles postés, avec id, titre, description, sujet (pour classement des posts), auteur, date du post, et éventuellement photo de l'article */
CREATE TABLE Articles (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    subject VARCHAR(50) NOT NULL,
    lien_web VARCHAR(400),
    user_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des likes et dislikes donnés par les users sur les articles */
CREATE TABLE Thumbs (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id SMALLINT UNSIGNED NOT NULL,
    article_id SMALLINT UNSIGNED NOT NULL,
    thumb TINYINT DEFAULT 0,
    liked TINYINT UNSIGNED DEFAULT 0,
    disliked TINYINT UNSIGNED DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


/*Création de la table des commentaires, avec id, titre et description, article et auteur associés */
CREATE TABLE Comments (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    cryptoslug VARCHAR(50) UNIQUE NOT NULL,
    content VARCHAR(1000) UNIQUE NOT NULL,
    user_id SMALLINT UNSIGNED NOT NULL,
    article_id SMALLINT UNSIGNED NOT NULL,
    date_post DATE NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
) ENGINE = InnoDB ;


INSERT INTO Users VALUES 
    (1, 'Bambi', 'aureliesueur@wanadoo.fr', 'bambi01as', 'Aurélie', 'Sueur', 0),
    (2, 'Chipolata', 'pauline.amartin@free.fr', 'figaro22', 'Pauline', 'Amartin', 0),
    (3, 'Pussicat', 'francedesmarais@gmail.com', 'bidibul65', 'France', 'Desmarais', 0),
    (4, 'Barbu55', 'guillaume.voisin@orange.fr', 'mouflon00', 'Guillaume', 'Voisin', 0),
    (5, 'Admin', 'jane.goodall@free.fr', '$2b$10$1e0ddcgQYxfMT8dIEOEwKed7VXb35OKieDT0//sXoloue/dcWKSHS', 'Jane', 'Goodall', 1),
    (6, 'papounet', 'olivier.sueur@free.fr', '$2b$10$r1kbPph2iT1sN6ZEWI8fyeO7dWF0hH0rdcGYXFLoFmBGUJTgLsWJe', 'Olivier', 'Sueur', 0),
    (7, 'Mistinguett', 'marie.dubois@orange.fr', '$2b$10$elPxLDcqWWScBwmUatU1LebXfsLnuqQP0G8GWfYdJP.JVXObDCIYm', 'Marie', 'Dubois', 0);
    
INSERT INTO Articles VALUES 
    (1, 'Nos coups de coeur', 'Nos-coups-de-coeur', 'Haec ubi latius fama vulgasset missaeque relationes adsiduae Gallum Caesarem permovissent, quoniam magister equitum longius ea tempestate distinebatur, iussus comes orientis Nebridius contractis. Haec ubi latius fama vulgasset missaeque relationes adsiduae Gallum Caesarem permovissent, quoniam magister equitum longius ea tempestate distinebatur, iussus comes orientis Nebridius contractis. Haec ubi latius fama vulgasset missaeque relationes adsiduae Gallum Caesarem permovissent, quoniam magister equitum longius ea tempestate distinebatur, iussus comes orientis Nebridius contractis. Haec ubi latius fama vulgasset missaeque relationes adsiduae Gallum Caesarem permovissent, quoniam magister equitum longius ea tempestate distinebatur, iussus comes orientis Nebridius contractis.', 'Société', 'https://www.zankyou.fr/p/mariage-paris-lieux-reception-originaux-7934', 2, '2020-12-21', false),
    (2, 'L''actu', 'L-actu', 'Undique militaribus copiis ad eximendam periculo civitatem amplam et oportunam studio properabat ingenti, quo cognito abscessere latrones nulla re amplius memorabili gesta, dispersique ut solent avia montium petiere celsorum. Undique militaribus copiis ad eximendam periculo civitatem amplam et oportunam studio properabat ingenti, quo cognito abscessere latrones nulla re amplius memorabili gesta, dispersique ut solent avia montium petiere celsorum. Undique militaribus copiis ad eximendam periculo civitatem amplam et oportunam studio properabat ingenti, quo cognito abscessere latrones nulla re amplius memorabili gesta, dispersique ut solent avia montium petiere celsorum. Undique militaribus copiis ad eximendam periculo civitatem amplam et oportunam studio properabat ingenti, quo cognito abscessere latrones nulla re amplius memorabili gesta, dispersique ut solent avia montium petiere celsorum.', 'Medias', 'https://www.actusmediasandco.com/', 4, '2020-12-17', false),
    (3, 'Atout prendre', 'Atout-prendre', 'Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni. Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni. Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni. Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni.', 'Culture', 'https://www.culture.gouv.fr/Aides-demarches/Crise-sanitaire-les-aides-de-l-Etat-aux-professionnels-de-la-culture/Aides-et-soutiens-aux-professionnels-de-la-culture-secteur-par-secteur', 3, '2020-11-23', false),
    (4, 'La vie d''avant', 'La-vie-d-avant', 'Nihil morati post haec militares avidi saepe turbarum adorti sunt Montium primum, qui divertebat in proximo, levi corpore senem atque morbosum, et hirsutis resticulis cruribus eius innexis divaricaturn sine spiramento ullo ad usque praetorium traxere praefecti. Nihil morati post haec militares avidi saepe turbarum adorti sunt Montium primum, qui divertebat in proximo, levi corpore senem atque morbosum, et hirsutis resticulis cruribus eius innexis divaricaturn sine spiramento ullo ad usque praetorium traxere praefecti. Nihil morati post haec militares avidi saepe turbarum adorti sunt Montium primum, qui divertebat in proximo, levi corpore senem atque morbosum, et hirsutis resticulis cruribus eius innexis divaricaturn sine spiramento ullo ad usque praetorium traxere praefecti. Nihil morati post haec militares avidi saepe turbarum adorti sunt Montium primum, qui divertebat in proximo, levi corpore senem atque morbosum, et hirsutis resticulis cruribus eius innexis divaricaturn sine spiramento ullo ad usque praetorium traxere praefecti.', 'Politique', 'https://www.reseaurural.fr/territoire-leader', 3, '2020-11-09', false);
      
      
INSERT INTO Thumbs VALUES 
    (1, 7, 3, 1, 1, 0),
    (2, 4, 2, -1, 0, 1),
    (3, 3, 4, 1, 1, 0),
    (4, 7, 1, -1, 0, 1),
    (5, 2, 1, 1, 1, 0),
    (6, 1, 2, -1, 0, 1),
    (7, 5, 3, 1, 1, 0),
    (8, 5, 4, -1, 0, 1);

INSERT INTO Comments VALUES 
    (1, '2cf05', 'Formidable ! Absolument génial, à lire !!', 2, 1, '2021-01-01', false),
    (2, 'ymim2', 'Nul, A EVITER !!', 1, 2, '2021-01-02', false),
    (3, '8an46', 'Pas mal. Mais manque de matière... Et est admodum mirum videre plebem innumeram mentibus ardore quodam infuso cum dimicationum curulium eventu pendentem.', 2, 3, '2021-01-01', false),
    (4, 'd94db', 'Intéressant. Un point de vue original !', 1, 3, '2021-01-03', false),
    (5, 'eo97j','Bof. Vu et revu cent fois... Haec similiaque memorabile nihil vel serium agi Romae permittunt. ergo redeundum ad textum.', 4, 4, '2020-12-21', false),
    (6, 'ri8j6','Passionnant, bravo ! A accrocher sur son frigo et à relire tous les jours...', 1, 4, '2020-12-18', false),
    (7, 'ls31i','J''ai pris du plaisir à lire cet article bien documenté.', 7, 4, '2021-01-18', false),
    (8, '89nh9', 'Article très décevant, surtout que je suis un spécialiste de ce domaine...', 7, 1, '2021-01-21', false),
    (9, 'gye54', 'Merci de nous faire partager votre passion et vos compétences, c''est passionnant...', 5, 2, '2021-01-11', false);
    
    
ALTER TABLE Articles ADD CONSTRAINT fk_article_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Thumbs ADD CONSTRAINT fk_thumb_article FOREIGN KEY (article_id) REFERENCES Articles(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Thumbs ADD CONSTRAINT fk_thumb_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Comments ADD CONSTRAINT fk_comment_article FOREIGN KEY (article_id) REFERENCES Articles(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Comments ADD CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;