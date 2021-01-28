<!--PAGE D'AFFICHAGE DES DETAILS D'UN ARTICLE-->
<template>
    <div>
        <div class="jumbotron container">
            <h1>{{ title }}</h1>
            <div class="row">
                <div v-if="currentArticle[0]" class="container col-12 col-md-10">
                    <div class='row'>
                        <div class="article__box col-12 col-md-9">
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
                                :sendLike="sendLike"
                                :sendDislike="sendDislike"
                                :deleteThumb="deleteThumb"
                                :liked="liked"
                                :disliked="disliked"
                                :totalLikes="totalLikes"
                                :totalDislikes="totalDislikes" />
                            <ul id="commentsList">
                                <h3>Derniers commentaires postés</h3>
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
                
                <div v-if="validUser || isAdmin" class="col-12 col-md-2">
                    <button type= "button" class="btn btn-primary" @click="showUpdate"><font-awesome-icon :icon="['fas', 'edit']" /> Modifier</button><br/>
                    <p>{{ messageUpdate }}</p>
                    <button type= "button" class="btn btn-primary btn-suppress" @click="confirmDelete"><font-awesome-icon :icon="['fas', 'trash-alt']" /> Supprimer</button>
                    <div v-if="confirmation">
                        <p>Etes-vous sûr de vouloir supprimer ce post ?</p>
                        <button type= "button" class="btn btn-primary" @click="deleteArticle">Supprimer</button>
                        <button type= "button" class="btn btn-primary" @click="refreshPage">Annuler</button>
                    </div>
                    <router-link to="/articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                    <router-view />
                </div>
                <div v-else>
                    <router-link to="/articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                    <router-view />
                </div>
            </div>
        </div>
        
        <div v-if="askForUpdate">
            <div class="container text-center form">
                <h2 >Pour modifier cet article, merci de remplir les champs suivants :</h2>
                <div class="row">
                    <div class="col-12 col-md-9 text-center form__box ">
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
                        <button class="btn btn-success" @click="updateArticle">Enregistrer vos modifications</button>
                    </div>
                </div>
            </div>
        </div>
        
        <Identification
            :logout="logout"
            :isUserAdmin="isUserAdmin"
            :isLoggedIn="isLoggedIn" />

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
            validUser: false,
            askForUpdate: false,
            confirmation: false,
            messageUpdate: "",
            liked: false,
            disliked: true,
            thumbs: [],
            totalLikes: 0,
            totalDislikes: 0
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
                    localStorage.setItem("articleId", this.currentArticle[0].id);
                    //localStorage.setItem("articleSlug", this.currentArticle[0].slug);
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
        updateArticle(slug, data, Authorization) {
            data = {
                title: this.currentArticle[0].title,
                slug: this.currentArticle[0].title,
                description: this.currentArticle[0].description,
                subject: this.currentArticle[0].subject,
                lien_web: this.currentArticle[0].lien_web,
                user_id: this.userId,
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            Authorization = `Bearer ${this.token}`;
            ArticlesDataServices.update(this.currentArticle[0].slug, data, { Authorization }) 
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
        },
        getAllComments(slug) {
            CommentsDataServices.getAll(slug, { Authorization: `Bearer ${this.token}`})
                .then(response => {
                    this.comments = JSON.parse(JSON.stringify(response.data.data));
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
                        this.totaDisLikes -= 1;
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
        }
    },    
    beforeMount() {
        this.getOneArticle(this.$route.params.slug);
        this.getAllComments(this.$route.params.slug);
        this.askForUpdate = false;
        this.validUser = false;
        this.liked = false;
        this.disliked = false;
        this.getTotalThumbs(this.$route.params.slug)
    }
}
    
    
</script>

<style scoped lang="scss">
   
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
    
.article__box {
    margin: auto;
}
  
#commentsList {
   padding:0 30px;     
}
    
.form {
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
</style>


