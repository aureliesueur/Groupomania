<template>
   <div>
        <div class="jumbotron container">
            <h1>Vous n'êtes pas satisfait de votre commentaire ?</h1>
            <div class="row">
                <div class="container col-12 col-md-10">
                    <div class='row'>
                        <div class="col-12 col-md-9">
                            <CommentsItem
                                :id=currentComment.id
                                :content=currentComment.content
                                :username=currentComment.username
                                :date_post=currentComment.date_post
                                :slug=currentComment.slug
                                 />
                        </div>
                        <div class="card-footer">
                            <button v-if="validUser" @click="showUpdate" type= "button" class="btn btn-primary">Modifier</button>
                            <button v-if="validUser" @click="suppressComment" type= "button" class="btn btn-primary">Supprimer</button>
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
        
    
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Footer from "../components/Footer"
import CommentsItem from "../components/CommentsItem"
import CommentsDataServices from "../services/CommentsDataServices"
import { mapState } from 'vuex'
    
export default {
    name: "CommentDetails",
    components: {
        Footer, CommentsItem
    },
    data () {
        return { 
            currentComment: [],
            validUser: false,
            updateIsAsked: false
        }
    },
    computed: {
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
                    if (this.currentComment.user_id !== this.userId) {
                            this.validUser = false;  
                    } else if (this.isAdmin == 1) {
                        this.validUser = true;
                    } else {
                        this.validUser = true;
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
                    this.$router.push({ path: '/articles/' + this.slug + '/#comments'});
                })
            .catch(error => console.log(error));
        },
        suppressComment(id, slug, Authorization) {
            Authorization = `Bearer ${this.token}`;
            CommentsDataServices.delete(this.$route.params.id, this.$route.params.slug, { Authorization })
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ path: '/articles/' + this.slug + '/#comments'});
                })
                .catch(error => console.log(error));
        },
    },    
    beforeMount() {
        this.getOneComment(this.$route.params.id, this.$route.params.slug);
    }
}
</script>

<style>
    
</style>