<!--PAGE D'AFFICHAGE DES DETAILS D'UN ARTICLE-->
<template>
    <div>
        <div class="jumbotron container">
            <h1>Cet article vous intéresse ? Découvrez-le en détails...</h1>
            <div class="row">
                <div v-if="currentArticle[0]" class="container col-12 col-md-10">
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
                
                <div class="col-12 col-md-2">
                    <button  type= "button" class="btn btn-primary" @click="showUpdate">Modifier</button><br/>
                    <button type= "button" class="btn btn-primary" @click="deleteArticle">Supprimer</button>
                    <p>{{ message }}</p>
                    <router-link to="/api/articles"><button type= "button" class="btn btn-primary">Retour à la liste</button></router-link>
                    <router-view />
                </div> 
            </div>
        </div>
        
        <div v-if="askForUpdate" class="container text-center">
            <h2>Pour modifier cet article, merci de remplir les champs suivants :</h2>
            <div class="form row">
                <div class="col-12 col-md-9">
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
                        <label for="subject">Sujet</label>
                        <input 
                               type="text" 
                               class="form-control"
                               required
                               v-model="currentArticle[0].subject"
                               name="sujet" />
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
            currentArticle: [],
            message: "",
            askForUpdate: false
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
        showUpdate() {
            return (this.askForUpdate = true)
        },
        updateArticle() {
            var data = {
                title: this.currentArticle[0].title,
                description: this.currentArticle[0].description,
                subject: this.currentArticle[0].subject,
                lien_web: this.currentArticle[0].lien_web,
                user_id: 3,//Trouver comment récupérer l'id du user connecté
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            ArticlesDataServices.update(this.currentArticle[0].id, data) 
                .then(response => {
                    console.log(response.data);
                    this.message = "Cet article a été modifié avec succès.";
                })
                .catch(error => console.log(error));
        },
        deleteArticle() {
            ArticlesDataServices.delete(this.currentArticle[0].id)
                .then(response => {
                    console.log(response.data);
                    this.message = "Cet article a bien été supprimé.";
                    this.$router.push({ path: "/api/articles" });
                })
                .catch(error => console.log(error));
        }   
    }, 
    beforeMount() {
        this.message = "";
        this.getOneArticle(this.$route.params.id);
        this.askForUpdate = false;
    }
}
</script>

<style lang="scss">

    .article__box {
        margin: auto;
    }
</style>

