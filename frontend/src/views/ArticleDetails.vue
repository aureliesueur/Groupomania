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
                
                <div v-if="validUser" class="col-12 col-md-2">
                    <button type= "button" class="btn btn-primary" @click="showUpdate">Modifier</button><br/>
                    <p>{{ messageUpdate }}</p>
                    <button type= "button" class="btn btn-primary" @click="confirmDelete">Supprimer</button>
                    <div v-if="confirmation">
                        <p>Etes-vous sûr de vouloir supprimer ce post ?</p>
                        <button type= "button" class="btn btn-primary" @click="deleteArticle">Supprimer</button>
                        <button type= "button" class="btn btn-primary" @click="refreshPage">Annuler</button>
                    </div>
                    <router-link to="/api/articles"><button type= "button" class="btn btn-primary">Retour à la liste</button></router-link>
                    <router-view />
                </div>
                <div v-else>
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
                        <select name="subject" v-model="currentArticle[0].subject">
                            <option value="">--Choisissez un sujet--</option>
                            <option value="Economie">Economie</option>
                            <option value="Politique">Politique</option>
                            <option value="Média">Média</option>
                            <option value="Societé">Société</option>
                            <option value="Psychologie">Psychologie</option>
                            <option value="Climat">Climat</option>
                            <option value="Sport">Sport</option>
                            <option value="Culture">Culture</option>
                            <option value="Autre">Autre</option>
                        </select>
                        <span> Sujet de l'article : {{ currentArticle[0].subject }}</span>
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
            validUser: false,
            askForUpdate: false,
            confirmation: false,
            messageUpdate: ""
        }
    },
    methods: {
        getOneArticle(id) {
            ArticlesDataServices.getOne(id) 
                .then(response => {
                    this.currentArticle = JSON.parse(JSON.stringify(response.data.data));
                    console.log(response.data.data);
                    console.log(this.currentArticle[0].user_id);
                    var storedId = localStorage.getItem('userId');
                    var userId = JSON.parse(storedId);
                    console.log(userId);
                    console.log(this.currentArticle[0].user_id);
                    if (this.currentArticle[0].user_id !== userId) {
                        this.validUser = false;  
                    } else {
                        return (this.validUser = true);
                    }
                })
                .catch(error => console.log(error));
        },
        showUpdate() {  
            return (this.askForUpdate = true);
        },
        confirmDelete() {
            return (this.confirmation = true);
        },
        refreshPage() {
          this.getOneArticle(this.$route.params.id);
          this.confirmation = false;
        },
        updateArticle() {
            var data = {
                title: this.currentArticle[0].title,
                description: this.currentArticle[0].description,
                subject: this.currentArticle[0].subject,
                lien_web: this.currentArticle[0].lien_web,
                user_id: this.currentArticle[0].user_id,
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            ArticlesDataServices.update(this.currentArticle[0].id, data) 
                .then(response => {
                    console.log(response.data);
                    this.messageUpdate = "Cet article a été modifié avec succès.";
                    this.askForUpdate = false;
                })
                .catch(error => console.log(error));
        },
        deleteArticle() {
            ArticlesDataServices.delete(this.currentArticle[0].id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ path: "/api/articles" });
                })
                .catch(error => console.log(error));
        }   
    }, 
    beforeMount() {
        this.getOneArticle(this.$route.params.id);
        this.askForUpdate = false;
        this.validUser = false;
    },
}
</script>

<style lang="scss">

    .article__box {
        margin: auto;
    }
</style>


