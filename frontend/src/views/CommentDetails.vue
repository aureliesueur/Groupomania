<template>
   <div>
        <div class="jumbotron container">
            <h1>{{ message }}</h1>
            <div class="row">
                <div class="container col-12 col-md-10">
                    <div class='row'>
                        <div v-if="!deleted" div class="col-12 col-md-9">
                            <CommentsItem
                                :id=currentComment.id
                                :content=currentComment.content
                                :username=currentComment.username
                                :user_id="currentComment.user_id"
                                :date_post=currentComment.date_post
                                :slug=currentComment.slug
                                 />
                        </div>
                        <div v-if="validUser && !deleted" class="card-footer">
                            <button @click="showUpdate" type= "button" class="btn btn-primary">Modifier</button>
                            <button @click="suppressComment" type= "button" class="btn btn-primary">Supprimer</button>
                        </div>
                        
                        <div>
                            <router-link to="/articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                            <router-view />
                        </div>
                        
                        <div v-if="updateIsAsked" class="form container">
                            <h2>Entrez votre nouveau commentaire :</h2>
                            <div class="row">
                                <div class="col-12 col-md-9 text-center form__box ">
                                    <div class="form-group">
                                        <label for="content"></label>
                                        <textarea
                                            type="textarea" 
                                            rows="5"
                                            cols="30"
                                            class="form-control"
                                            required
                                            v-model="currentComment.content"
                                            placeholder="content"
                                            name="content" />
                                    </div>
                                    <button class="btn btn-success" @click="updateComment">Poster ce commentaire</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="!isLoggedIn">
            <Identification />
        </div>
        
        <div> 
            <div v-if="!isLoggedIn">
                <Identification />
            </div>
            <div v-else class="deconnect">
                <button type="button" class="btn btn-secondary deconnect__btn" @click="logout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Déconnexion</button>
            </div>
            <div id="account">
                <p v-if="isUserAdmin">ADMINISTRATEUR CONNECTE</p>
            </div>
        </div>
    
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Footer from "../components/Footer"
import Identification from "../components/Identification"
import CommentsItem from "../components/CommentsItem"
import CommentsDataServices from "../services/CommentsDataServices"
import { mapGetters, mapState } from 'vuex'
    
export default {
    name: "CommentDetails",
    components: {
        Footer, CommentsItem, Identification
    },
    data () {
        return { 
            message: "",
            deleted: null,
            currentComment: {
                id: 0,
                content: "",
                username: "",
                user_id: 0,
                date_post: "",
                slug:""
            },
            validUser: false,
            updateIsAsked: false,
        }
    },
    computed: {
      ...mapGetters(['isLoggedIn']),
        ...mapGetters(['isUserAdmin']),
        ...mapState({ token: "token"}),
        ...mapState({ userId: "userId"}),
        ...mapState({ isAdmin: "isAdmin"})
     },
    methods: {
       getOneComment(id, slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            CommentsDataServices.getOne(this.$route.params.id, this.$route.params.slug, { Authorization }) 
                .then(response => {
                    this.currentComment = JSON.parse(JSON.stringify(response.data.data[0]));
                    if (this.currentComment.user_id == this.userId || this.isAdmin === 1) {
                        this.validUser = true;  
                    } else {
                        this.validUser = false;
                    }               
                })
                .catch(error => console.log(error));
        },
        showUpdate() {
            this.updateIsAsked = true;
        },
        updateComment(id, slug, data, Authorization) {
            data = {
                content: this.currentComment.content,
                user_id: this.userId,
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            console.log(data);
            Authorization = `Bearer ${this.token}`;
            CommentsDataServices.update(this.$route.params.id, this.$route.params.slug, data, { Authorization }) 
                .then(response => {
                    console.log(response.data);
                    this.updateAsked = false;
                    this.message = "Votre commentaire a bien été modifié";
                    this.updateIsAsked = false;
                })
            .catch(error => console.log(error));
        },
        suppressComment(id, slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            CommentsDataServices.delete(this.$route.params.id, this.$route.params.slug, { Authorization })
                .then(response => {
                    console.log(response.data);
                    this.message = "Votre commentaire a bien été supprimé";
                    this.deleted = true;
                })
                .catch(error => console.log(error));
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
        }
    },    
    beforeMount() {
        this.getOneComment(this.$route.params.id, this.$route.params.slug);
    }
}
</script>

<style>
    
</style>