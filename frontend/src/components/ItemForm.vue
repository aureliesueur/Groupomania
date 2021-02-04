<!--COMPONENT CORRESPONDANT A L'AFFICHAGE D'UN FORMULAIRE DE SAISIE D'UN ARTICLE (UTILISABLE EVENTUELLEMENT DANS LES PAGES POSTARTICLE.VUE ET ARTICLEDETAILS.VUE)-->

<template>
    <div class="container text-center form">
        <h2>{{ message }}</h2>
        <div class="row">
            <div role="form" class="col-12 col-md-9 text-center form__box ">
                <div class="form-group">
                    <label for="title">Titre</label>
                    <input 
                           type="text" 
                           class="form-control"
                           required
                           v-model="title"
                           name="title" />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea 
                            type="textarea" 
                            rows="5"
                            cols="30"
                            class="form-control"
                            v-model="description"
                            name="description"
                            id="description"/>
                </div>
                <div class="form-group">
                    <select name="subject" v-model="subject">
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
                    <span> Sujet de l'article : {{ subject }}</span>
                </div>
                <div class="form-group">
                    <label for="lien-web">Lien web de l'article</label>
                    <input 
                           type="text" 
                           class="form-control"
                           v-model="lien_web"
                           name="lien-web" />
                </div>
                <button class="btn btn-success" @click="doWithArticle">Enregistrer vos modifications</button>
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
 
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
    
.form {
    position: absolute;
    top: 20%;
    left: 15%;
    max-width: 60%;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid $color-primary;
    margin: auto;
    padding: 20px;
    &__box {
        margin: auto;
    }
}
    
</style>