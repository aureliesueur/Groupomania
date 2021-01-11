<!--PAGE D'ACCUEIL DU FORUM ARTICLES PRESENTANT LA LISTE COMPLETE DES ARTICLES-->
<template>
    <div class="jumbotron">
        <h1>Plateforme de partage d'articles</h1>

        <div>
            <h2>Liste de tous les articles postés</h2>
            <div class="container">
                <div class='row'>
                    <ul class="col-12 col-md-9">
                        <li><ArticlesItem 
                            v-for="article in articles"
                            :key="article.title"
                            :title="article.title"
                            :description="article.description"
                            :subject="article.subject"
                            :lien_web="article.lien_web"
                            :imageURL="article.image_URL"
                            :user_id="article.user_id"
                            :date_post="article.date_post"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>

import Footer from "../components/Footer"
import ArticlesItem from "../components/ArticlesItem"
import ArticlesDataServices from "../services/ArticlesDataServices"
    
export default {
    name: "Articles",
    components: {
		Footer, ArticlesItem
	},
    data () {
        return {
            articles:[],
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
    
    
/*<li><ArticlesItem 
                    v-for="item in articles"
                    @click="showArticle(item)"
                    :title="item.title"
                    :description="item.description"
                    :subject="item.subject"
                    :lien_web="item.lien_web"
				    :imageURL="item.imageURL"
				    :user_id="item.user_id"
				    :date_post="item.date_post"
				    :key="item.title"
                    /></li>
            */
</script>

<style>
    
</style>

 