<!--PAGE D'AFFICHAGE DES DETAILS D'UN ARTICLE-->
<template>
    <div>
        <div class="jumbotron">
            <h1>Cet article vous intéresse ? Découvrez-le en détails...</h1>
            <div class="container">
                <div class='row'>
                    <div class="article__box col-12 col-md-9"><ArticlesItem 
                        :key="currentArticle[0].title"
                        :id="currentArticle[0].id"
                        :title="currentArticle[0].title"
                        :description="currentArticle[0].description"
                        :subject="currentArticle[0].subject"
                        :lien_web="currentArticle[0].lien_web"
                        :imageURL="currentArticle[0].image_URL"
                        :username="currentArticle[0].username"
                        :date_post="currentArticle[0].date_post"
                        />
                    </div>
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
    name: "ArticleDetails",
    components: {
		Footer, Identification, ArticlesItem
	},
    data () {
        return {
            currentArticle: null
        }
    },
    methods: {
        getOneArticle(id) {
            ArticlesDataServices.getOne(id) 
                .then(response => {
                this.currentArticle = JSON.parse(JSON.stringify(response.data.data));
                console.log(response.data.data);
                })
                .catch(error => console.log(error));
        },
    }, 
    beforeMount() {
        this.getOneArticle(this.$route.params.id);
    }
}
</script>

<style lang="scss">

    .article__box {
        margin: auto;
    }
</style>


 