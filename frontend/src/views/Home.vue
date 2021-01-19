<!--PAGE D'ACCUEIL PRESENTANT LES ACCES AUX DEUX PLATEFORMES-->
<template>
    <div class="container jumbotron">
        <section v-if="isLoggedIn" class="row">
            <h1>Bienvenue sur Groupomania, le réseau social interne de votre entreprise !</h1>
            <div class="card col-12 col-sm-6">
                <h2>Partagez vos articles préférés</h2>
                <router-link to="/api/articles"><button class="btn btn-primary">Accès au Forum Groupomania Articles</button></router-link>
            </div>
            <div class="card col-12 col-sm-6">
                <h2>Partagez vos vidéos préférées</h2>
                <router-link to="/api/gifs"><button class="btn btn-primary">Accès au Forum Groupomania Vidéos</button></router-link>
            </div>
            <router-view />
        </section>
        
        <section v-else class="row">
            <h1>Bienvenue sur Groupomania, le réseau social interne de votre entreprise !</h1>
            <div class="card col-12 col-sm-6">
                <h2>Partagez vos articles préférés</h2>
                <button class="btn btn-primary" @click="callToLogin">Accès au Forum Groupomania Articles</button>
            </div>
            <div class="card col-12 col-sm-6">
                <h2>Partagez vos vidéos préférées</h2>
                <button class="btn btn-primary" @click="callToLogin">Accès au Forum Groupomania Vidéos</button>
            </div>
        </section>
        
         <CallToLogin v-if="loginCalled" />
        
        <div> 
            <div v-if="!isLoggedIn">
                <Identification />
            </div>
            <div v-else id="deconnect">
                <button type="button" class="btn btn-secondary" @click="logout">Déconnexion</button>
            </div>
            <p v-if="isUserAdmin" id="adminConnect">ADMINISTRATEUR CONNECTE</p>
        </div>
        
        <div>
            <Footer />
        </div>
    </div> 
</template>


<script>
import Footer from "../components/Footer"
import Identification from "../components/Identification"
import CallToLogin from "../components/CallToLogin"
import { mapGetters } from 'vuex'
    
    
export default {
	name: "Home",
	components: {
		Footer, Identification, CallToLogin
	},
	data() {
		return {
            loginCalled: false
        }
    },
	computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapGetters(['isUserAdmin'])
	},
	methods: {
        callToLogin() {
            if (this.isLoggedIn == false) {
                this.loginCalled = true;
            }
        },
        logout() {
            this.$store.commit("logout")
        }
	}
}
</script>

<style lang="scss">
 
/*#call-to-login {
    position: absolute;
    top: 40%;
    z-index: 2;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid #cc2810;
    padding: 50px;
}*/
</style>