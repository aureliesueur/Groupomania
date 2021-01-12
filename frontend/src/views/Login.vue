<!--PAGE DE CONNEXSION D'UN USER PRESENT DANS LA BDD : LOGIN-->

<template>
    <div>
        <h1>Merci de vous identifier pour pouvoir profiter de toutes les fonctionnalités de la plateforme Groupomania</h1>
        <div v-if="!submitted" class="jumbotron container">
            <h2>Entrez vos identifiants de connexion</h2>
            <form class="row">
                <div class="form-group col-9 col-md-6 text-center">
                    <label for="email">Votre email</label>
                    <input 
                           id="email" 
                           type="email" 
                           v-model="email" 
                           placeholder="pauline.martin@free.fr" 
                           required 
                           autofocus
                           class="form-control">
                </div>
                <div class="form-group col-9 col-md-6 text-center">
                    <label for="password">Votre mot de passe</label>
                    <input 
                           id="password" 
                           type="password" 
                           v-model="password" 
                           required
                           class="form-control"
                           placeholder="Bidibul75">
                </div>
                <button class="btn btn-success" type="submit" @click="loginSubmit">Connectez-vous</button>
            </form>
        </div>
        <div v-else>
            <h3>Votre compte a bien été créé, nous sommes ravis de vous compter parmi nous !</h3>
            <router-link to="/api/articles"><button class="btn btn-primary">Revenir au Forum Groupomania Articles</button></router-link>
            <router-link to="/api/gifs"><button class="btn btn-primary">Revenir au Forum Groupomania Vidéos</button></router-link>
        </div>

        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Footer from "../components/Footer"
import UsersDataServices from "../services/UsersDataServices"
    
export default {
    name: 'Login',
    components: {
        Footer
    },
    data () {
        return {
            email: "",
            password: "",
            submitted: false
        }
    },
    methods: {
        loginSubmit(e) {
            e.preventDefault()
            var data = {
                email: this.email,
                password: this.password
            };
            UsersDataServices.login(data) 
                .then(response => {
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(error => console.log(error));
        }
    }
}

</script>

<style scoped>
    
</style>

