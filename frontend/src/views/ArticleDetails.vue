<!--PAGE D'AFFICHAGE DES DETAILS D'UN ARTICLE-->
<template>
    <div>
        <div class="jumbotron container articlePage">
            <div id="header">
                <router-link to="/articles" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary" id="arrow-only" aria-label="Lien vers la page d'accueil"><i class="fas fa-arrow-left"></i></button></router-link>
                <h1>{{ title }}</h1>
            </div>
            <div class="row articlePage__box">
                <div v-if="currentArticle[0]" class="container col-12 col-md-10">
                    <div class='row'>
                        <div class="col-12 col-lg-11">
                            <ArticlesItem 
                                :key="currentArticle[0].title"
                                :id="currentArticle[0].id"
                                :title="currentArticle[0].title"
                                :slug="currentArticle[0].slug"
                                :description="currentArticle[0].description"
                                :subject="currentArticle[0].subject"
                                :lien_web="currentArticle[0].lien_web"
                                :username="currentArticle[0].username"
                                :date_post="currentArticle[0].date_post"
                                :presenceOfLinks="presenceOfLinks"
                                :sendLike="sendLike"
                                :sendDislike="sendDislike"
                                :deleteThumb="deleteThumb"
                                :liked="liked"
                                :disliked="disliked"
                                :totalLikes="totalLikes"
                                :totalDislikes="totalDislikes" />
                            <h3 id="comments-title">{{ messageComments }}</h3>
                            <ul id="commentsList">
                                <li v-for="comment in comments" :key="comment.id">
                                    <CommentsItem
                                        :id="comment.id"
                                        :cryptoslug="comment.cryptoslug"
                                        :user_id="comment.user_id"
                                        :content="comment.content"
                                        :username="comment.username"
                                        :date_post="comment.date_post"
                                        :slug="currentArticle[0].slug" />
                                </li>
                            </ul>                        
                        </div>
                    </div>
                </div>
                
                <div v-if="validUser || isAdmin" class="col-12 col-md-2 action valid">
                    <button type= "button" class="btn btn-primary action__btn" @click="showUpdate"><font-awesome-icon :icon="['fas', 'edit']" /> Modifier</button><br/>
                    <p class="text">{{ messageUpdate }}</p>
                    <button type= "button" class="btn btn-primary btn-suppress action__btn" @click="confirmDelete"><font-awesome-icon :icon="['fas', 'trash-alt']" /> Supprimer</button>
                    <div v-if="confirmation" class="confirmation">
                        <p class="text">Etes-vous sûr de vouloir supprimer ce post ?</p>
                        <button type= "button" class="btn btn-primary" @click="deleteArticle">Supprimer</button>
                        <button type= "button" class="btn btn-primary cancel-btn" @click="refreshPage">Annuler</button>
                    </div>
                    <router-link to="/articles" class="valid__return" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                    <router-view />
                </div>
                <div v-else class="action invalid">
                    <router-link to="/articles" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                    <router-view />
                </div>
            </div>
       
        
            <div v-if="askForUpdate">
                <div role="form" class="container text-center formUpdate">
                    <h2 >Pour modifier cet article, merci de remplir les champs suivants :</h2>
                    <div class="row">
                        <div class="col-12 col-md-9 text-center formUpdate__box ">
                            <div class="form-group">
                                <label for="title">Titre</label>
                                <input 
                                       type="text" 
                                       class="form-control"
                                       required
                                       v-model="currentArticle[0].title"
                                       name="title" />
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea 
                                        type="textarea" 
                                        rows="5"
                                        cols="30"
                                        class="form-control"
                                        v-model="currentArticle[0].description"
                                        name="description"
                                        id="description"/>
                            </div>
                            <div class="form-group">
                                <select name="subject" v-model="currentArticle[0].subject">
                                    <option value="">--Choisissez un sujet--</option>
                                    <option value="Economie">Economie</option>
                                    <option value="Politique">Politique</option>
                                    <option value="Média">Média</option>
                                    <option value="Societé">Société</option>
                                    <option value="Psychologie">Psychologie</option>
                                    <option value="Climat">Climat</option>
                                    <option value="Sport">Sport</option>
                                    <option value="Culture">Culture</option>
                                    <option value="Santé">Santé</option>
                                    <option value="Autre">Autre</option>
                                </select>
                                <span> Sujet de l'article : </span>
                            </div>
                            <div class="form-group">
                                <label for="lien-web">Lien web de l'article</label>
                                <input 
                                       type="text" 
                                       class="form-control"
                                       v-model="currentArticle[0].lien_web"
                                       name="lien-web" />
                            </div>
                            <button class="btn btn-success" @click="updateArticle" aria-label="Valider">Enregistrer vos modifications</button>
                        </div>
                    </div>
                </div>
            </div>

            <Identification
                :logout="logout"
                :isUserAdmin="isUserAdmin"
                :isLoggedIn="isLoggedIn" />
        </div>
        <Footer />
    </div>
</template>


<script>
import Footer from "../components/Footer"
import Identification from "../components/Identification"
import ArticlesItem from "../components/ArticlesItem"
import CommentsItem from "../components/CommentsItem"
import ArticlesDataServices from "../services/ArticlesDataServices"
import CommentsDataServices from "../services/CommentsDataServices"
import ThumbsDataServices from "../services/ThumbsDataServices"
import { mapGetters, mapState } from 'vuex'
    
export default {
    name: "ArticleDetails",
    components: {
		Footer, ArticlesItem, CommentsItem, Identification
	},
    data () {
        return {
            title: "Cet article vous intéresse ? Découvrez-le en détails...",
            currentArticle: [],
            comments: [],
            messageComments: "",
            validUser: false,
            askForUpdate: false,
            confirmation: false,
            messageUpdate: "",
            liked: false,
            disliked: true,
            thumbs: [],
            totalLikes: 0,
            totalDislikes: 0,
            alreadyCommented: false,
            presenceOfLinks: true
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapGetters(['isUserAdmin']),
        ...mapState({ token: "token"}),
        ...mapState({ userId: "userId"}),
        ...mapState({ isAdmin: "isAdmin"})
    },
    methods: {
        getOneArticle(slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            ArticlesDataServices.getOne(slug, { Authorization }) 
                .then(response => {
                    this.currentArticle = JSON.parse(JSON.stringify(response.data.data));
                    console.log(this.currentArticle[0].id);
                    if (this.currentArticle[0].lien_web === null || this.currentArticle[0].lien_web === undefined || this.currentArticle[0].lien_web === "") {
                        this.presenceOfLinks = false;
                    }
                    localStorage.setItem("articleId", this.currentArticle[0].id);
                        if (this.currentArticle[0].user_id !== this.userId) {
                            this.validUser = false;  
                        } else if (this.isAdmin == 1) {
                            this.validUser = true;
                        } else {
                            this.validUser = true;
                        }
                })
                .catch(error => console.log(error));
        },
        showUpdate() {  
            return (this.askForUpdate = true);
        },
        confirmDelete() {
            return (this.confirmation = true);
        },
        refreshPage() {
          this.getOneArticle(this.$route.params.slug);
          this.confirmation = false;
        },
        updateArticle(id, data, Authorization) {
            data = {
                title: this.currentArticle[0].title,
                //slug: this.currentArticle[0].title,
                description: this.currentArticle[0].description,
                subject: this.currentArticle[0].subject,
                lien_web: this.currentArticle[0].lien_web,
                user_id: this.currentArticle[0].user_id,
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            console.log(data);
            Authorization = `Bearer ${this.token}`;
            ArticlesDataServices.update(this.currentArticle[0].id, data, { Authorization }) 
                .then(response => {
                    console.log(response.data);
                    this.messageUpdate = "Cet article a été modifié avec succès.";
                    this.askForUpdate = false;
                })
            .catch(error => console.log(error));
        }, 
        deleteArticle(slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            ArticlesDataServices.delete(this.currentArticle[0].slug, { Authorization })
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ path: "/articles" });
                })
                .catch(error => console.log(error));
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        },
        getAllComments(slug) {
            CommentsDataServices.getAll(slug, { Authorization: `Bearer ${this.token}`})
                .then(response => {
                    this.comments = JSON.parse(JSON.stringify(response.data.data));
                    console.log(this.comments);
                    if (this.comments.length !== 0) {
                        this.messageComments = "Derniers commentaires postés"; 
                    } else {
                        this.messageComments = "Il n'y a aucun commentaire pour le moment.";
                    }
                    this.comments.forEach(comment => {
                        if (comment.user_id === this.userId) {
                            this.alreadyCommented = true;
                            localStorage.setItem("alreadyCommented", this.currentArticle[0].slug);
                        }
                    });
                })
                .catch(error => console.log(error));
        },
        sendLike(slug, data, Authorization) {
            data = {
                user_id: this.userId,
                thumb: 1, 
            };
           Authorization = `Bearer ${this.token}`;
            slug = this.$route.params.slug;
            ThumbsDataServices.postThumb(slug, data, { Authorization }) 
                .then(response => {
                    console.log(response.data);
                    this.liked = true;
                    this.totalLikes += 1;
                })
                .catch(error => console.log(error));
        },
        sendDislike(slug, data, Authorization) {
            data = {
                user_id: this.userId,
                thumb: -1, 
            };
            Authorization = `Bearer ${this.token}`;
            slug = this.$route.params.slug;
            ThumbsDataServices.postThumb(slug, data, { Authorization }) 
                .then(response => {
                    console.log(response.data);
                    this.disliked = true;
                    this.totalDislikes += 1;
                })
                .catch(error => console.log(error));
        },
        deleteThumb(Authorization) {
            Authorization = `Bearer ${this.token}`;
            ThumbsDataServices.delete(this.$route.params.slug, { Authorization })
                .then(response => {
                    console.log(response.data);
                    if (this.liked) {
                        this.liked = false;
                        this.totalLikes -= 1;
                    } else if (this.disliked) {
                        this.disliked = false;
                        this.totalDislikes -= 1;
                    }
                })
                .catch(error => console.log(error));
        },
        getTotalThumbs(slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            ThumbsDataServices.getAllThumbs(slug, { Authorization }) 
                .then(response => {
                    console.log(response.data.data[0]);
                    var result = JSON.parse(JSON.stringify(response.data.data[0]));
                    if (result.sumOfLikes == null) {
                        this.totalLikes = 0;
                    } else if (result.sumOfDislikes == null) {
                        this.totalDislikes = 0;
                    } else {
                        this.thumbs = JSON.parse(JSON.stringify(response.data.data[0]));
                        this.totalLikes = this.thumbs.sumOfLikes;
                        this.totalDislikes = this.thumbs.sumOfDislikes;
                    }
                })
                .catch(error => console.log(error));
        },
        getUserThumb(slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            ThumbsDataServices.getOneThumb(slug, { Authorization }) 
                .then(response => {
                    var result = response.data.data[0];
                    console.log(result.disliked);
                    if (result === undefined) {
                        this.liked = false;
                        this.disliked = false;
                    } else {
                        if (result.liked === 1) {
                            this.liked = true;
                            this.disliked = false;
                        } else if (result.disliked === 1) {
                            this.disliked = true;
                            this.liked = false;
                        }
                    }
                 })
                .catch(error => console.log(error));
        }
    },    
    beforeMount() {
        this.getOneArticle(this.$route.params.slug);
        this.getAllComments(this.$route.params.slug);
        this.askForUpdate = false;
        this.validUser = false;
        this.liked = false;
        this.disliked = false;
        this.getTotalThumbs(this.$route.params.slug);
        this.getUserThumb(this.$route.params.slug);
    }
}
    
    
</script>

<style scoped lang="scss">
   
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
 
h1 {
    margin-bottom: 40px!important;
}
    
.articlePage {
    background: url("/images/network3.jpg") fixed no-repeat!important;
    background-size: cover!important;
    margin-bottom: 0!important;
    padding-bottom: 30px!important;
    width: 100%;
    &__box {
        margin: auto;
        display: flex!important;
        flex-direction: row!important;
        justify-content: center!important;
    }
}
  
#commentsList {
   padding:0 30px;     
}

#comments-title {
    font-size: 1.2em;
}
    
.formUpdate {
    position: absolute;
    top: 20%;
    left: 15%;
    max-width: 60%;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid $color-primary;
    margin: auto;
    padding: 20px;
    &__box {
        margin: auto;
    }
}
    
.btn-suppress {
    margin-bottom: 30px;
}
    
#arrow-only {
    display: none;
}

.cancel-btn {
        margin-left: 20px!important;
}
    
.confirmation {
    background: #FFF;
    border: 1px solid $color-primary;
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    bottom: 50%;
}
.text {
    color: $color-primary;
    font-style: italic;
}
    
    
//Média query pour adapter la page à la tablette
@media screen and (min-width : 768px) and (max-width : 1024px) { 
     h1 {
        margin-bottom: 30px!important;
        margin-top: 80px!important;
    }
    #header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 60px!important;
    }
    .articlePage__box {
        display: flex!important;
        flex-direction: column!important;
    }
    #arrow-only {
        display: block;
    } 
    .invalid {
        margin: auto;
        margin-top: 20px;
    }
    .valid__return {
        display: none;
    }
    #comments-title {
        font-size: 1.1em;
    }
    .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        margin-top: 20px;
        &__btn {
            width: 200px!important;
        }
    }
    .formUpdate {
        margin: auto!important;
        max-width: 80%;
        margin-left: -5%!important;
        top: 50%;
        z-index: 6;
        &__box {
            margin: auto;
        }
    }
    .cancel-btn {
        margin-left: 20px!important;
    }
    .confirmation {
        width: 400px;
    }
}
    
//Média query pour adapter la page au smartphone   
@media screen and (max-width : 768px) {  
    h1 {
        margin-bottom: 30px!important;
        margin-top: 40px!important;
    }
    #header {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 110px!important;
    }
    .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        margin-top: 20px;
    }
    .btn-suppress {
        margin-bottom: 0!important;
    }
    #comments-title {
        font-size: 1.1em;
    }
    #arrow-only {
        display: block;
    } 
    .formUpdate {
        left: 5%;
        max-width: 90%;
        top: 100%;
        &__box {
            margin: auto;
        }
    }
    .cancel-btn {
        margin-left: 20px!important;
    }
    .confirmation {
        background: #FFF;
        border: 1px solid $color-primary;
        padding: 10px;
        border-radius: 5px;
        position: absolute;
        bottom: 50%;
    }
    .text {
        color: $color-primary;
        font-style: italic;
    }
}
</style>


