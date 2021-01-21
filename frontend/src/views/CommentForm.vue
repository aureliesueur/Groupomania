<template>
    <div class="container text-center form">
        <h2>Pour ajouter un commentaire, remplissez le champ suivant :</h2>
        <div class="row">
            <div class="col-12 col-md-9 text-center form__box ">
                <div class="form-group">
                    <textarea
                        type="textarea" 
                        rows="5"
                        cols="30"
                        class="form-control"
                        required
                        v-model="content"
                        placeholder="Formidable !"
                        name="content" />
                </div>
                <button class="btn btn-success" @click="publishComment">Poster ce commentaire</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ItemForm',
        props: {
            message: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            subject: {
                type: String,
                required: true
            },
            lien_web: {
                type: String,
            },
            doWithArticle:  {
                type: Function
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