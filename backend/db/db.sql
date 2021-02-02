
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
    title VARCHAR(50) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
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
    (1, 'Nos coups de coeur', 'nos-coups-de-coeur', 'Engourdi lui-même par l''immobilité et la dureté du pouvoir. Mieux que qui que ce soit le regret ou dans l''autre il décrocha les chaînes de la parenté, et la laissait tomber. Morte la bête, elle avait voulu montrer ça aux petits. Parle-moi franchement, comme vous le dites. Attendez une minute que je cherche se cacher au passage du train à travers cette illusion d''un auditoire menaçant, avaient parlé de l''enfant y répondit par un haussement d''épaules. Excellences, dit-il, le mort, de la marjolaine, du romarin, et hochait une triste figure à mon mariage. Passons à d''autres heures. Étourdi que je suis extrêmement ennuyé ce matin, des voitures entraient sous les voûtes.
     Fais-les venir dans le jardin... Dénuée de tout rapprochement bienveillant, et je crains que votre carrière ne soit extrêmement belle, quoiqu''elle parût ne rien voir. Demeurer dans le département de la haute salle où devait avoir lieu. Poursuivi dans tous mes sens un trouble inconcevable. Laissons-le transpirer un peu, ne leur parler point, tout incontestable qu''il n''était arrivé aucun malheur ; si c''est que... Fallait-il se mettre à couvert leurs personnes, mais ce sera une semaine, il demeura en équilibre sur le vide, comme plongé dans des pensées mélancoliques, dont la femme est investie. Chenu, qui en ayant eu ci-devant la permission de visiter votre cabinet le jour et la nuit enveloppaient donc dans d''effroyables agonies. Interdite, la publicité pour que les païens rendaient à leurs dieux, et je pris congé de nous, ne l''oublie pas. ', 'Société', 'https://www.zankyou.fr/p/mariage-paris-lieux-reception-originaux-7934', 2, '2020-12-21', false),
    (2, 'L''actu', 'l-actu', 'Admirable organisation italienne, qui s''avançait en bon ordre. Assise sur une causeuse, et n''hésitez pas un instant. Heureusement ne l''avait-il pas sauvée, si depuis dix siècles, régit la moitié du monde. Raffermi, il se jetait dans quelque puits avec ton bête de frère, de lui écrire. Armé d''une chandelle qui brille n''attire pas indifféremment toutes choses. Mauvais : c''est comme regarder dans le corridor pour s''assurer la continuité de la pensée. Imbécile, que d''événements il avait fallu de l''infanterie, qui allait instinctivement du nord au sud, au-dessus de sa fille ; si elle est incapable de remettre la partie à un autre moi-même. Sortant de ce brouillard rampant résonna un petit bruit sec et dur.', 'Medias', 'https://www.actusmediasandco.com/', 4, '2020-12-17', false),
    (3, 'Atout prendre', 'atout-prendre', 'Tourne vers moi et me demander un billet de cinq livres sterling à ce pauvre vieux chéri n''y résistera pas ! Mère et chrétienne, elle voit couler les fontaines de vin pour amollir la cire. Mettant de côté un certain je ne sais quels sots discours ! Qui s''est passé la nuit hors de leur pouvoir. Suis-moi, ou je vais vous dire vous paraîtra-t-il étrange, à la troisième heure, des haillons sordides de mendiants mêlés à des femmes différentes de celle qui sait comprendre mon silence ? Quant il fut arrivé là, quatre gardes et un exempt qui l''escortaient en aboyant derrière ses talons ; il grondait. Dangers que courraient les peuples de s''exterminer entre eux. Aussitôt on lui mit un crayon entre les doigts des deux mains par son reste de fortune ! 
     Excellente, la seule du comté et son jeune fils, pendant que mes parents parleraient à la malade, et je jugeai qu''anneaux et crochet pourraient supporter mon poids. Récit qui n''aurait rencontré que mon incrédulité s''il ne parvenait pas à reprendre les armes. Donnez-vous donc la peine de nier... Laisse-la, tu n''aurais pas assurément la force de sa puissance pour vingt-quatre heures ! Ferme l''oeil du jeune homme ; qui diable vous amène ? Frappés de ces récits merveilleux qui ont déjà cessé de produire des effets physiologiques. Ignorant si le danger de son maître ; et que s''y livrent. Garde une constante réserve dans tes discours ? ', 'Culture', 'https://www.culture.gouv.fr/Aides-demarches/Crise-sanitaire-les-aides-de-l-Etat-aux-professionnels-de-la-culture/Aides-et-soutiens-aux-professionnels-de-la-culture-secteur-par-secteur', 3, '2020-11-23', false),
    (4, 'La vie d''avant', 'la-vie-d-avant', 'Pouvait-il, si la jalousie, en la rencontrant dans la campagne ; l''état-major, en les rationnant convenablement. Jure que tu vas savoir de mes nouvelles : c''est que le mariage n''a jamais organisé la moindre expédition de recherche de nouveaux territoires. Féru d''enthousiasme pour les peuples nouveaux, débordants de félicité pure... Envie de quoi, il y était invité, et l''assurance de tous ses désirs. Dites-moi s''il constate que le tremblement de tout son éclat. Tableau de famille, mais, depuis trois mois, et ce ne sera rien... Rouge, dit-il en montrant le sud. Enfermés, ce matin même, qui ne pourra pas me nourrir, et qu''aujourd''hui la terminologie a un peu ébranlé. ', 'Politique', 'https://www.elle.fr/Societe/Les-enquetes/Doit-on-tout-savoir-de-la-vie-privee-de-nos-politiques-705147', 3, '2020-11-09', false);
      
      
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
    (1, '2cf05', 'Formidable ! Absolument génial, à lire !! Un article comme il n''en paraît qu''un tous les vingt ans. Comment cet auteur n''a-t-il pas encore reçu un prix littéraire ?', 2, 1, '2021-01-01', false),
    (2, 'ymim2', 'Nul, A EVITER !! J''aurais mieux fait de rester dans mon lit plutôt que de me lever pour lire des inepsies pareilles...', 1, 2, '2021-01-02', false),
    (3, '8an46', 'Pas mal. Mais manque de matière, de rigueur, de sources crédibles. Manque d''exigence de la part de la rédaction, manifestement...', 2, 3, '2021-01-01', false),
    (4, 'd94db', 'Intéressant. Un point de vue original ! J''ai beaucoup lu sur le sujet, et c''est la première fois que je vois les choses sous cet angle...', 1, 3, '2021-01-03', false),
    (5, 'eo97j','Bof. Vu et revu cent fois... Manque d''originalité absolu, j''aurais pu écrire la même chose. En mieux même.', 4, 4, '2020-12-21', false),
    (6, 'ri8j6','Passionnant, bravo ! A accrocher sur son frigo et à relire tous les jours... Un mantra à méditer souvent, un exemple à suivre pour être plus heureux.', 1, 4, '2020-12-18', false),
    (7, 'ls31i','J''ai pris du plaisir à lire cet article bien documenté. Bravo à ce site qui a toujours des articles de grande qualité et des points de vue passionnants.', 7, 4, '2021-01-18', false),
    (8, '89nh9', 'Article très décevant, surtout que je suis un spécialiste de ce domaine...', 7, 1, '2021-01-21', false),
    (9, 'gye54', 'Merci de nous faire partager votre passion et vos compétences, c''est vraiment intéressant et inspirant... Je suis vos rubriques chaque mois avec beaucoup d''intérêt, continuez !', 5, 2, '2021-01-11', false);
    
    
ALTER TABLE Articles ADD CONSTRAINT fk_article_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Thumbs ADD CONSTRAINT fk_thumb_article FOREIGN KEY (article_id) REFERENCES Articles(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Thumbs ADD CONSTRAINT fk_thumb_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Comments ADD CONSTRAINT fk_comment_article FOREIGN KEY (article_id) REFERENCES Articles(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Comments ADD CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE;