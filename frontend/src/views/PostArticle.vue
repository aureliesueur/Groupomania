<!--PAGE D'AJOUT D'UN NOUVEL ARTICLE-->
<template>
    <div class="jumbotron">
        <h1>Vous souhaitez partager un article avec votre communauté ? C'est ici !</h1>

     <!--   <div class="submit-form">
            <div v-if="!submitted">
                
                <div class="form-group">
                    <label for="title">Titre</label>
                    <input 
                           type="text" 
                           class="form-control"
                           v-model="article.title"
                           name="title" />
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <input 
                           type="text" 
                           class="form-control"
                           v-model="article.description"
                           name="description" />
                </div>
                
                <div class="form-group">
                    <label for="subject">Sujet</label>
                    <input 
                           type="text" 
                           class="form-control"
                           required
                           v-model="article.subject"
                           name="sujet" />
                </div>
                
                <div class="form-group">
                    <label for="lien-web">Lien web de l'article</label>
                    <input 
                           type="text" 
                           class="form-control"
                           v-model="article.lien_web"
                           name="lien-web" />
                </div>
                
                <div class="form-group">
                    <label for="imageURL">URL de l'image</label>
                    <input 
                           type="text" 
                           class="form-control"
                           v-model="article.imageURL"
                           name="imageURL" />
                </div>
                
                <div class="form-group">
                    <label for="userID">Id de l'utilisateur</label>
                    <input 
                           type="number" 
                           class="form-control"
                           v-model="article.user_id"
                           name="userID" />
                </div>
                
                <div class="form-group">
                    <label for="date-post">Date du partage</label>
                    <input 
                           type="date" 
                           class="form-control"
                           v-model="article.date_post"
                           name="date-post" />
                </div>
                
            </div>
        </div>-->
        
        
        
        
        
        
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>

import Footer from "../components/Footer"
export default {
    name: "PostArticle",
    components: {
		Footer
	},
    data () {
        return {
        }
    },
}
</script>

<style>
    
</style>