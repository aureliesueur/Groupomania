<template>
   <div>
        <div class="jumbotron container comment">
            <h1 class="comment__msg">{{ message }}</h1>
            <div class="row">
                <div class="container col-12 col-md-10">
                    <div class='row'>
                        <div v-if="!deleted" div class="col-12 col-md-9 comment__box">
                            <CommentsItem
                                :id="currentComment.id"
                                :cryptoslug="currentComment.cryptoslug"
                                :content="currentComment.content"
                                :username="currentComment.username"
                                :user_id="currentComment.user_id"
                                :date_post="currentComment.date_post"
                                :slug="currentComment.slug" />
                        </div>
                        <div class="comment__btnBox">
                            <div v-if="validUser && !deleted" class="comment__btns">
                                <button @click="showUpdate" type= "button" class="btn btn-primary"><font-awesome-icon :icon="['fas', 'edit']" /></button>
                                <button @click="suppressComment" type= "button" class="btn btn-primary"><font-awesome-icon :icon="['fas', 'trash-alt']" /></button>
                            </div>

                            <div>
                                <router-link to="/articles" aria-label="Lien vers la liste d'articles"><button type= "button" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Retour à la liste</button></router-link>
                                <router-view />
                            </div>
                        </div>
                        
                        <div v-if="updateIsAsked" class="formUpComment container">
                            <h2 class="formUpComment__title">Mettez à jour votre commentaire :</h2>
                            <div class="row">
                                <div class="col-12 col-md-9 text-center formUpComment__box">
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
                                    <button class="btn btn-success" @click="updateComment">Valider</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <Identification
            :logout="logout"
            :isUserAdmin="isUserAdmin"
            :isLoggedIn="isLoggedIn" />
    
        <Footer />
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
                cryptoslug: "",
                content: "",
                username: "",
                user_id: 0,
                date_post: "",
                slug:""
            },
            alreadyCommented: false,
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
       getOneComment(cryptoslug, slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            CommentsDataServices.getOne(this.$route.params.cryptoslug, this.$route.params.slug, { Authorization }) 
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
        updateComment(cryptoslug, slug, data, Authorization) {
            data = {
                content: this.currentComment.content,
                user_id: this.userId,
                date_post: new Date().toLocaleDateString('fr-CA'), 
            };
            console.log(data);
            Authorization = `Bearer ${this.token}`;
            CommentsDataServices.update(this.$route.params.cryptoslug, this.$route.params.slug, data, { Authorization }) 
                .then(response => {
                    console.log(response.data);
                    this.message = "Votre commentaire a bien été modifié";
                    this.updateIsAsked = false;
                })
            .catch(error => console.log(error));
        },
        suppressComment(cryptoslug, slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            CommentsDataServices.delete(this.$route.params.cryptoslug, this.$route.params.slug, { Authorization })
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
            localStorage.clear();
        }
    },    
    beforeMount() {
        this.getOneComment(this.$route.params.cryptoslug, this.$route.params.slug);
    }
}
</script>

<style lang="scss">
    
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
    
.comment {
    &__btns {
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    &__btnBox {
        margin: auto!important;
        margin-top: 20px!important;
    }
    &__msg {
        margin-top: 120px;
        margin-bottom: 40px!important;
        font-size: 1.2em!important;
        color:$color-secondary;
    }
}
    
.formUpComment {
    position: absolute;
    top: 10%;
    width: 50%;
    z-index: 2;
    background: #DDD;
    padding: 20px;
    margin: auto;
    border: 1px solid $color-secondary;
    &__box {
       margin: auto;
    }
    &__title {
        margin-bottom: 15px!important;
    }
}
    
h1 {
    margin-bottom: 0px!important;
}
    
//Média query pour adapter la page à la tablette
@media screen and (min-width : 768px) and (max-width : 1024px) { 
    .comment__box {
        margin: auto!important;
    }
}
    
</style>