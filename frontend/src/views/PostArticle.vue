<!--PAGE D'AJOUT D'UN NOUVEL ARTICLE-->
<template>
    <div class="jumbotron">
        <h1>Vous souhaitez partager vos intérêts avec votre communauté ? C'est ici !</h1>
        <div v-if="!submitted" class="container text-center">
            <h2>Pour poster un nouvel article, merci de remplir les champs suivants :</h2>
            <div class="form row">
                <div class="form__box col-12 col-md-9">
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
                        <input 
                               type="text" 
                               class="form-control"
                               required
                               v-model="article.description"
                               name="description"
                               id="description"/>
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
                    <!--<div class="form-group">
                        <label for="imageURL">URL de l'image</label>
                        <input 
                               type="text" 
                               class="form-control"
                               v-model="article.imageURL"
                               name="imageURL" />
                    </div>-->

                    <button class="btn btn-success" @click="saveArticle">Envoyer votre post</button>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>Votre article a bien été envoyé !</h3>
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
import ArticlesDataServices from "../services/ArticlesDataServices"
//import { eventBus } from "./main"
    
export default {
    name: "PostArticle",
    components: {
		Footer, Identification
	},
    data () {
        return {
            article: {
                title: "",
                description: "", 
                subject: "",
                lien_web: "",
            },
            submitted: false,
            //userId: 0
        };
    },
    methods: {
        saveArticle() {
            var data = {
                title: this.article.title,
                description: this.article.description,
                subject: this.article.subject,
                lien_web: this.article.lien_web,
                user_id: 3,//Trouver comment récupérer l'id du user connecté
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            ArticlesDataServices.create(data) 
                .then(response => {
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(error => console.log(error));
        }/*,
        onUser() {
            eventBus.$on("LoggedInUser", (user) => {
                this.userid = user.id;
                console.log(user);
            })
        }*/
    }/*,
    created() {
        this.onUser();
    }*/
}
</script>


<style lang="scss">

.form__box {
    margin: auto;
}
#description {
    height: 150px!important;
}
    
</style>




