<!--PAGE D'AJOUT D'UN NOUVEL ARTICLE-->
<template>
    <div class="jumbotron"> 
        <h1 v-if="!submitted">Vous souhaitez partager vos intérêts avec votre communauté ? C'est ici !</h1>
        <div v-if="!submitted" class="container text-center form formArticle">
            <h2>Pour poster un nouvel article, merci de remplir les champs suivants :</h2>
            <div class="row">
                <div class="formArticle__box col-12 col-md-9">
                    <div class="form-group">
                        <label for="title">Titre</label>
                        <input 
                               type="text" 
                               class="form-control"
                               required
                               v-model="article.title"
                               name="title" />
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea 
                                type="textarea" 
                                rows="5"
                                cols="30"
                                class="form-control"
                                v-model="article.description"
                                name="description"
                                id="description"/>
                    </div>
                    <div class="form-group">
                        <select name="subject" v-model="article.subject">
                            <option value="">--Choisissez un sujet--</option>
                            <option value="Economie">Economie</option>
                            <option value="Politique">Politique</option>
                            <option value="Média">Média</option>
                            <option value="Société">Société</option>
                            <option value="Psychologie">Psychologie</option>
                            <option value="Climat">Climat</option>
                            <option value="Sport">Sport</option>
                            <option value="Culture">Culture</option>
                            <option value="Santé">Santé</option>
                            <option value="Autre">Autre</option>
                        </select>
                        <span> Sujet de l'article : {{ article.subject }}</span>
                    </div>
                    <div class="form-group">
                        <label for="lien-web">Lien web de l'article</label>
                        <input 
                               type="text" 
                               class="form-control"
                               v-model="article.lien_web"
                               name="lien-web" />
                    </div>

                    <button class="btn btn-success" @click="saveArticle">Envoyer votre post</button>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>Votre article a bien été envoyé !</h3>
            <router-link to="/articles"><button type= "button" class="btn btn-primary">Retour à la liste</button></router-link>
            <router-view />
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
import ArticlesDataServices from "../services/ArticlesDataServices"
import { mapGetters, mapState } from 'vuex'
    
export default {
    name: "PostArticle",
    components: {
		Footer, Identification
	},
    data () {
        return {
            article: {
                title: "",
                slug: "",
                description: "", 
                subject: "",
                lien_web: "",
            },
            submitted: false,
        };
    },
     computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"}),
        ...mapState({ userId: "userId"}),
        ...mapGetters(['isUserAdmin'])
    },
    methods: {
        saveArticle(data, Authorization) {
            data = {
                title: this.article.title,
                slug: this.article.title,
                description: this.article.description,
                subject: this.article.subject,
                lien_web: this.article.lien_web,
                user_id: this.userId,
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            Authorization = `Bearer ${this.token}`;
            ArticlesDataServices.create(data, { Authorization }) 
                .then(response => {
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(error => console.log(error));
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
        }
    }
}
</script>


<style scoped lang="scss">

//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
    
#description {
    height: 150px!important;
}

.formArticle {
    position: absolute;
    top: 20%;
    z-index: 2;
    max-width: 60%!important;
    margin-left: 8%!important;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid $color-primary;
    padding: 20px;
    &__box {
        margin: auto;
    }
}
</style>




