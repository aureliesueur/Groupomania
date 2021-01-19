<!--PAGE D'ACCUEIL DU FORUM ARTICLES PRESENTANT LA LISTE COMPLETE DES ARTICLES-->
<template>
    <div class="jumbotron">
        <h1>Plateforme de partage d'articles</h1>

        <div>
            <h2>Liste de tous les articles postés</h2>
            <div class="container">
                <div class='row'>
                    <ul class="col-12 col-md-9">
                        <li class="row" v-for="article in articles" :key="article.title">
                            <ArticlesItem 
                            :id="article.id"
                            :title="article.title"
                            :description="article.description"
                            :subject="article.subject"
                            :lien_web="article.lien_web"
                            :imageURL="article.image_URL"
                            :username="article.username"
                            :date_post="article.date_post"
                            class="col-9"
                            />
                        </li>
                    </ul>
                    
                    <div class="col-12 col-md-3">
                        <router-link to="/api/articles/add"><button  type= "button" class="btn btn-primary">Poster un nouvel article</button></router-link>
                        <!--<div v-if="postAsked"> /@click="askForPost"
                            <p>Pour profiter de cette fonctionnalité, vous devez d'abord vous connecter ou créer un compte.</p>
                            <div>
                                <router-link to="/api/auth/signup" class="auth__signup"><button  type= "button" class="btn btn-primary">Inscription</button></router-link><br/>
                                <router-link to="/api/auth/login" class="auth__login"><button type= "button" class="btn btn-primary">Connexion</button></router-link>
                                <router-link to="/api/articles"><button type= "button" class="btn btn-primary">Annuler</button></router-link>
                            </div>
                            <router-view />    
                        </div>-->
                    </div> 
                </div>
            </div>
            <p v-if="articles.length == 0">{{ message }}</p>
        </div>
        <div v-if="!isLoggedIn">
            <Identification />
        </div>
        
        <!--<div v-else>
            <button type="button" class="btn btn-secondary" @click="logout">Déconnexion</button>
        </div>-->
        
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>

import Footer from "../components/Footer"
import Identification from "../components/Identification"
import ArticlesItem from "../components/ArticlesItem"
import ArticlesDataServices from "../services/ArticlesDataServices"
import { mapGetters, mapState } from 'vuex'
    
export default {
    name: "Articles",
    components: {
		Footer, ArticlesItem, Identification, 
	},
    data () {
        return {
            articles:[],
            activeArticle: null,
            message: "Il n'y a aucun article posté sur la plateforme à ce jour.",
            detailsAsked: false,
            postAsked: false
        };
    },
   computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"})
    },
    methods: {
        getAllArticles() {
            ArticlesDataServices.getAll({ Authorization: `Bearer ${this.token}`})
                .then(response => {
                this.articles = JSON.parse(JSON.stringify(response.data.data));
                console.log(response.data.data);
                })
                .catch(error => console.log(error));
        },
        /*logout() {
            this.$store.commit("logout")
        }/*,
        askForPost() {
            return(this.postAsked = true)
        }*/
    },
    beforeMount() {
        this.getAllArticles();
    }
};
    
</script>

<style lang="scss">

ul, li {
    list-style: none;
}

a {
    height: 50px;
    margin-top: 40px!important;
}
    
</style>

 