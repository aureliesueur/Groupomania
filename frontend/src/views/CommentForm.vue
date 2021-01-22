<template>
    <div class="container text-center form">
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
</template>

<script>
    
import CommentsDataServices from "../services/CommentsDataServices"
import { mapState } from 'vuex'
    
export default {
    name: 'CommentForm',
    data () {
        return {
            comment: {
                content: "",
                user_id: "", 
                date_post: "",
            }
        }
    },
    computed: {
        ...mapState({ token: "token"}),
        ...mapState({ userId: "userId"}),
    },
    methods: {
        postComment(id,data, Authorization) {
        data = {
            content: this.comment.content,
            user_id: this.userId,
            date_post: new Date().toLocaleDateString('fr-CA'), 
        };
        Authorization = `Bearer ${this.token}`;
        CommentsDataServices.create(data, { Authorization }) 
            .then(response => {
                console.log(response.data);
                this.submitted = true;
            })
            .catch(error => console.log(error));
        }
    }
}
    
</script>

<style scoped lang="scss">
 
.form {
    position: absolute;
    top: 20%;
    left: 15%;
    max-width: 60%;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid #cc2810;
    margin: auto;
    padding: 20px;
    &__box {
        margin: auto;
    }
}
    
</style>