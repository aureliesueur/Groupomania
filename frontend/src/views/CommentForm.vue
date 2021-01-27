<template>
    <div>
        <div v-if="!submitted" class="container text-center form">
            <h2>Pour ajouter un commentaire, remplissez le champ suivant :</h2>
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
                            v-model="comment.content"
                            placeholder="Formidable !"
                            name="content" />
                    </div>
                    <button class="btn btn-success" @click="postComment">Poster ce commentaire</button>
                </div>
            </div>
        </div>
        <div v-if="submitted">
            <p>{{ message }}</p>
            <router-link to="/articles"><button type= "button" class="btn btn-primary">Retour à la liste</button></router-link>
            <router-view />
        </div>
        
        <Footer />
    </div>
</template>

<script>
 
import Footer from "../components/Footer"
import CommentsDataServices from "../services/CommentsDataServices"
import { mapState } from 'vuex'
    
export default {
    name: 'CommentForm',
    components: {
        Footer
    },
    data () {
        return {
            comment: {
                content: "",
                user_id: "", 
                article_id: 0,
                date_post: "",
            },
            submitted: false, 
            message:""
        }
    },
    computed: {
        ...mapState({ token: "token"}),
        ...mapState({ userId: "userId"}),
    },
    methods: {
        postComment(slug, data, Authorization) {
        data = {
            content: this.comment.content,
            user_id: this.userId,
            article_id: localStorage.getItem("articleId"),
            date_post: new Date().toLocaleDateString('fr-CA'), 
        };
        Authorization = `Bearer ${this.token}`;
        slug = this.$route.params.slug;
        CommentsDataServices.create(slug, data, { Authorization }) 
            .then(response => {
                console.log(response.data);
                this.submitted = true;
                this.message = "Votre commentaire a bien été posté !"
            })
            .catch(error => console.log(error));
        }
    }
}
            
    
</script>

<style scoped lang="scss">
 
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
    
.form {
    position: absolute;
    top: 20%;
    left: 15%;
    max-width: 60%;
    margin: auto;
    padding: 20px;
    &__box {
        margin: auto;
    }
}
    
</style>