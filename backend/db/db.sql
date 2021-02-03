
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
    (1, 'Nos coups de coeur', 'nos-coups-de-coeur2020-12-23', 'Et eodem impetu Domitianum praecipitem per scalas itidem funibus constrinxerunt, eosque coniunctos per ampla spatia civitatis acri raptavere discursu. iamque artuum et membrorum divulsa conpage superscandentes corpora mortuorum ad ultimam truncata deformitatem velut exsaturati mox abiecerunt in flumen. Pandente itaque viam fatorum sorte tristissima, qua praestitutum erat eum vita et imperio spoliari, itineribus interiectis permutatione iumentorum emensis venit Petobionem oppidum Noricorum, ubi reseratae sunt insidiarum latebrae omnes, et Barbatio repente apparuit comes, qui sub eo domesticis praefuit, cum Apodemio agente in rebus milites ducens, quos beneficiis suis oppigneratos elegerat imperator certus nec praemiis nec miseratione ulla posse deflecti.', 'Société', 'https://www.zankyou.fr/p/mariage-paris-lieux-reception-originaux-7934', 2, '2020-12-21', false),
    (2, 'L''actu', 'l-actu2021-01-01', 'Sed maximum est in amicitia parem esse inferiori. Saepe enim excellentiae quaedam sunt, qualis erat Scipionis in nostro, ut ita dicam, grege. Numquam se ille Philo, numquam Rupilio, numquam Mummio anteposuit, numquam inferioris ordinis amicis, Q. vero Maximum fratrem, egregium virum omnino, sibi nequaquam parem, quod is anteibat aetate, tamquam superiorem colebat suosque omnes per se posse esse ampliores volebat. Cuius acerbitati uxor grave accesserat incentivum, germanitate Augusti turgida supra modum, quam Hannibaliano regi fratris filio antehac Constantinus iunxerat pater, Megaera quaedam mortalis, inflammatrix saevientis adsidua, humani cruoris avida nihil mitius quam maritus; qui paulatim eruditiores facti processu temporis ad nocendum per clandestinos versutosque rumigerulos conpertis leviter addere quaedam male suetos falsa et placentia sibi discentes, adfectati regni vel artium nefandarum calumnias insontibus adfligebant.', 'Medias', 'https://www.actusmediasandco.com/', 4, '2020-12-17', false),
    (3, 'Atout prendre', 'atout-prendre2021-01-21', 'Illud autem non dubitatur quod cum esset aliquando virtutum omnium domicilium Roma, ingenuos advenas plerique nobilium, ut Homerici bacarum suavitate Lotophagi, humanitatis multiformibus officiis retentabant. Et eodem impetu Domitianum praecipitem per scalas itidem funibus constrinxerunt, eosque coniunctos per ampla spatia civitatis acri raptavere discursu. iamque artuum et membrorum divulsa conpage superscandentes corpora mortuorum ad ultimam truncata deformitatem velut exsaturati mox abiecerunt in flumen. Mensarum enim voragines et varias voluptatum inlecebras, ne longius progrediar, praetermitto illuc transiturus quod quidam per ampla spatia urbis subversasque silices sine periculi metu properantes equos velut publicos signatis quod dicitur calceis agitant, familiarium agmina tamquam praedatorios globos post terga trahentes ne Sannione quidem, ut ait comicus, domi relicto. quos imitatae matronae complures opertis capitibus et basternis per latera civitatis cuncta discurrunt.', 'Culture', 'https://www.culture.gouv.fr/Aides-demarches/Crise-sanitaire-les-aides-de-l-Etat-aux-professionnels-de-la-culture/Aides-et-soutiens-aux-professionnels-de-la-culture-secteur-par-secteur', 3, '2020-11-23', false),
    (4, 'La vie d''avant', 'la-vie-d-avant2020-12-21', 'Quod cum ita sit, paucae domus studiorum seriis cultibus antea celebratae nunc ludibriis ignaviae torpentis exundant, vocali sonu, perflabili tinnitu fidium resultantes. denique pro philosopho cantor et in locum oratoris doctor artium ludicrarum accitur et bybliothecis sepulcrorum ritu in perpetuum clausis organa fabricantur hydraulica, et lyrae ad speciem carpentorum ingentes tibiaeque et histrionici gestus instrumenta non levia. Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus. quod si impetrasset, fulminis modo cuncta vastarat. erat autem quod cogitabat huius modi.', 'Politique', 'https://www.elle.fr/Societe/Les-enquetes/Doit-on-tout-savoir-de-la-vie-privee-de-nos-politiques-705147', 3, '2020-11-09', false);
      
      
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