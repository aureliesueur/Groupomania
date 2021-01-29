<template>
    <div>
        <div class="container jumbotron text-center">
            <div v-if="!submitted" class=" formComment">
                <h2>Pour ajouter un commentaire, remplissez le champ suivant :</h2>
                <div class="row">
                    <div class="col-12 col-md-9 text-center formComment__box ">
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
                        <div v-if="forbidden">
                            <p>Vous avez déjà commenté cet article, vous ne pouvez le faire qu'une fois !</p>
                            <router-link to="/articles"><button type= "button" class="btn btn-primary">Retour à la liste</button></router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="submitted" >
                <p>{{ message }}</p>
                <router-link to="/articles"><button type= "button" class="btn btn-primary">Retour à la liste</button></router-link>
                <router-view />
            </div>
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
            message:"",
            forbidden: false
        }
    },
    computed: {
        ...mapState({ token: "token"}),
        ...mapState({ userId: "userId"}),
    },
    methods: {
        postComment(slug, data, Authorization) {
            let alreadyCommented = localStorage.getItem("alreadyCommented");
            if (alreadyCommented && alreadyCommented == this.$route.params.slug) {
                this.forbidden = true;
            } else {
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
}
            
    
</script>

<style scoped lang="scss">
 
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
 
.jumbotron {
    padding-top: 200px!important;
    padding-bottom: 100px!important;
}
    
.formComment {
    margin: auto!important;
    padding: 20px;
    &__box {
        margin: auto;
    }
}
    
</style>