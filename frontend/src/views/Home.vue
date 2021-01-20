<!--PAGE D'ACCUEIL PRESENTANT LES ACCES AUX DEUX PLATEFORMES-->
<template>
    <div class="container jumbotron text-center">
        <section v-if="isLoggedIn" class="row text-center intro">
            <h1>Bienvenue sur Groupomania, le réseau social interne de votre entreprise !</h1>
            <div class="card col-12 col-sm-5 intro__articles">
                <h2>Partagez vos articles préférés</h2>
                <router-link to="/api/articles"><button class="btn btn-primary">Accès au Forum Groupomania Articles</button></router-link>
            </div>
            <div class="card col-12 col-sm-5 intro__gifs">
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
            <div v-else class="deconnect">
                <button type="button" class="btn btn-secondary deconnect__btn" @click="logout">Déconnexion</button>
            </div>
            <div id="info">
                <p v-if="isUserAdmin">ADMINISTRATEUR CONNECTE</p>
                <button v-else class="btn btn-primary auth__btn" @click="showAccount">Votre compte</button>
            </div>
        </div>
        
        <div v-if="accountAsked" class="account">
            <p>Votre pseudo : {{ username }}</p>
            <p>Votre email: {{ email }}</p>
            <p>Votre prénom: {{ first_name }}</p>
            <p>Votre nom: {{ last_name }}</p>
            <button class="btn btn-success account__btn" @click="suppressUser">Supprimer votre compte</button><br/>
            <button class="btn account__btn" @click="hideAccount">Retour</button>
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
            loginCalled: false,
            accountAsked: false
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
        },
        showAccount() {
            this.accountAsked = true
        },
        hideAccount() {
          this.accountAsked = false
        }
	}
}
</script>

<style lang="scss">
 
.intro {
    &__articles {
        margin-right: 30px;
    }
}
    
.account {
    background: #324392;
    border: 2px solid #FFF;
    border-radius: 10px;
    padding: 20px;
    z-index: 4;
    color: #FFF;
    position: absolute;
    top: 10%;
    right: 10%;
    &__btn {
        width: 70%;
    }
}

</style>