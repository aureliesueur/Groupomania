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
                            <a class="btn btn-secondary col-3" :href="'/api/articles/' + article.id">En savoir plus</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <Identification />
        
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
    
export default {
    name: "Articles",
    components: {
		Footer, Identification, ArticlesItem
	},
    data () {
        return {
            articles:[],
            activeArticle: null
        };
    },
    methods: {
        getAllArticles() {
            ArticlesDataServices.getAll()
                .then(response => {
                this.articles = JSON.parse(JSON.stringify(response.data.data));
                console.log(response.data.data);
                })
                .catch(error => console.log(error));
        },
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

 