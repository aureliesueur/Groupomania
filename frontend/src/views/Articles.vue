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
                    </div> 
                </div>
            </div>
            <p v-if="articles.length == 0">{{ message }}</p>
        </div>
        
        <CallToLogin v-if="!isLoggedIn" />
        
        <div> 
            <div v-if="!isLoggedIn">
                <Identification />
            </div>
            <div v-else id="deconnect">
                <button type="button" class="btn btn-secondary" @click="logout">Déconnexion</button>
            </div>
            <p v-if="isUserAdmin" id="adminConnect">ADMINISTRATEUR CONNECTE</p>
        </div>
        
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>

import Footer from "../components/Footer"
import Identification from "../components/Identification"
import CallToLogin from "../components/CallToLogin"
import ArticlesItem from "../components/ArticlesItem"
import ArticlesDataServices from "../services/ArticlesDataServices"
import { mapGetters, mapState } from 'vuex'
        
export default {
    name: "Articles",
    components: {
		Footer, ArticlesItem, CallToLogin, Identification, 
	},
    data () {
        return {
            articles:[],
            activeArticle: null,
            message: "Il n'y a aucun article posté sur la plateforme à ce jour.",
            //detailsAsked: false
        }
    },
   computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapGetters(['isUserAdmin']),
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
        logout() {
            this.$store.commit("logout")
        }
    },
    beforeMount() {
        this.getAllArticles();
    }
};
    
</script>

<style lang="scss">

 #call-to-login {
    position: absolute;
    top: 40%;
    z-index: 2;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid #cc2810;
    padding: 50px;
}    
    
ul, li {
    list-style: none;
}

a {
    height: 50px;
    margin-top: 40px!important;
}
    
</style>

 