<!--PAGE D'ACCUEIL DU FORUM ARTICLES PRESENTANT LA LISTE COMPLETE DES ARTICLES-->
<template>
    <div>
        <div class="jumbotron articles">
            <h1>Plateforme de partage d'articles</h1>
            <div>
                <h2>Derniers articles postés</h2>
                <div class="container">
                    <div class='row'>
                        <ul class="col-12 col-md-10">
                            <li v-for="article in articles" :key="article.title">
                                <ArticlesItem 
                                :id="article.id"
                                :title="article.title"
                                :slug="article.slug"
                                :description="article.description"
                                :subject="article.subject"
                                :lien_web="article.lien_web"
                                :username="article.username"
                                :date_post="article.date_post"
                                class="col-12 col-sm-9"          
                                />
                            </li>
                        </ul>

                        <div class="col-12 col-md-2">
                            <router-link to="/articles/add" aria-label="Poster l'article"><button  type= "button" class="btn btn-primary btn-add"><i class="far fa-plus-square"></i> Poster un nouvel article</button></router-link>
                        </div> 
                    </div>
                </div>
                <p v-if="articles.length == 0">{{ message }}</p>
            </div>

            <CallToLogin v-if="!isLoggedIn" />

            <Identification
                :logout="logout"
                :isUserAdmin="isUserAdmin"
                :isLoggedIn="isLoggedIn"
                  />

        </div> 
        <Footer />

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
            message: "Il n'y a aucun article posté sur la plateforme à ce jour."
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
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        }
    },
    beforeMount() {
        this.getAllArticles();
    }
};
    
</script>

<style lang="scss">   
 
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
    
    
.articles {
    width: 80%;
    margin: auto;
    margin-bottom: 0!important;
    background: url("/images/network3.jpg") fixed no-repeat!important;
    background-size: cover!important;
    &__box {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        margin-left: -200px;
        & img {
            margin-top: 40px;
            border: 1px solid $color-primary;
        }
    }
 }
    
ul, li {
    list-style: none;
    width: 100%;
    margin: auto!important;
}

a {
    height: 50px;
    margin-top: 40px!important;
}
    
.btn-add {
    width: 200px!important;
    margin-left: -200px!important;
}
    

//Média query pour adapter la page à la tablette
@media screen and (min-width : 768px) and (max-width : 1024px) { 
    .btn-add {
        width: 200px!important;
        margin-left: -150px!important;
    }
}
   
//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {  
    h1 {
        margin-bottom: 0px!important;
    }
    .btn-add {
        margin: 10px auto!important;
        font-size: 1em!important;
        
    }
    .card {
        line-height: 20px;
        &__body {
            padding-left: 0!important;
            padding-right: 0!important;
        }
    }
}

    
</style>

 