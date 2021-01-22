<!--PAGE D'ACCUEIL PRESENTANT LES ACCES AUX DEUX PLATEFORMES-->
<template>
    <div class="container jumbotron text-center">
        <section v-if="isLoggedIn" class="row text-center intro">
            <h1>Bienvenue sur Groupomania, le réseau social interne de votre entreprise !</h1>
            <div class="card col-12 col-sm-5 intro__articles">
                <h2>Partagez vos articles préférés</h2>
                <router-link to="/articles"><button class="btn btn-primary">Accès au Forum Groupomania Articles</button></router-link>
            </div>
            <div class="card col-12 col-sm-5 intro__gifs">
                <h2>Partagez vos vidéos préférées</h2>
                <router-link to="/gifs"><button class="btn btn-primary">Accès au Forum Groupomania Vidéos</button></router-link>
            </div>
            <router-view />
        </section>
        
        <section v-else class="row">
            <h1>Bienvenue sur Groupomania, le réseau social interne de votre entreprise !</h1>
            <div class="card col-12 col-sm-5 intro__articles">
                <h2>Partagez vos articles préférés</h2>
                <button class="btn btn-primary" @click="callToLogin">Accès au Forum Groupomania Articles</button>
            </div>
            <div class="card col-12 col-sm-5">
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
                <div class="info">
                    <p v-if="isUserAdmin">ADMINISTRATEUR CONNECTE</p>
                    <button v-else class="btn btn-primary auth__btn info__btn" @click="showAccount">Votre compte</button>
                </div>
            </div>
            
        </div>
        
        <div v-if="accountAsked" class="account">
            <h3>Détails de votre compte</h3>
            <p>Pseudo : {{ username }}</p>
            <p>Email: {{ email }}</p>
            <p>Prénom: {{ first_name }}</p>
            <p>Nom: {{  last_name }}</p>
            <button class="btn account__btn" @click="confirmDelete" >Supprimer votre compte</button>
            <button class="btn account__btn" @click="hideAccount">Retour</button>
        </div>
        
        <div v-if="confirmation" class="confirm">
            <p>Etes-vous sûr de vouloir supprimer votre compte ? Toute suppression est définitive.</p>
            <button type= "button" class="btn confirm__btn" @click="suppressUser">Supprimer</button>
            <button type= "button" class="btn confirm__btn" @click="refreshPage">Annuler</button>
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
import UsersDataServices from "../services/UsersDataServices"
import { mapGetters, mapState } from 'vuex'  
    
export default {
	name: "Home",
	components: {
		Footer, Identification, CallToLogin
	},
	data() {
		return {
            loginCalled: false,
            accountAsked: false,
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            confirmation: false
        }
    },
	computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapGetters(['isUserAdmin']),
        ...mapState({ userId: "userId"}),
        ...mapState({ token: "token"})
	},
	methods: {
        callToLogin() {
            if (this.isLoggedIn == false) {
                this.loginCalled = true;
            }
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
        },
        showAccount() {
            this.accountAsked = true
        },
        hideAccount() {
          this.accountAsked = false
        },
        showUser() {
            UsersDataServices.getCurrentUser(this.userId) 
                .then(response => {
                    this.currentUser = JSON.parse(JSON.stringify(response.data.data[0]));
                    console.log(this.currentUser);//
                    this.username = this.currentUser.username,
                    this.email = this.currentUser.email,
                    this.first_name = this.currentUser.first_name,
                    this.last_name = this.currentUser.last_name
                    console.log(this.username, this.email);
                })
                .catch(error => console.log(error));
        },
        suppressUser() {
            UsersDataServices.deleteUser(this.userId) 
                .then(response => {
                    console.log(response.data);
                    this.isLoggedIn = false;
                    this.logout();
                    this.refreshPage();
                })
                .catch(error => console.log(error));
        },
        confirmDelete() {
            return (this.confirmation = true);
        },
        refreshPage() {
            this.$router.push({ path: "/" });
            this.hideAccount();
            this.confirmation = false;
        },
	},
    mounted() {
        this.showUser(this.userId);
    },
}
</script>


<style lang="scss">
 
.intro {
    &__articles {
        margin-right: 20px!important;
    }
}
    
.account {
    background: #324392;
    border: 2px solid #FFF;
    border-radius: 10px;
    box-shadow: 3px 3px 5px #6f757b;
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
    
.confirm {
    background: #324392;
    border: 2px solid #FFF;
    border-radius: 10px;
    box-shadow: 3px 3px 5px #6f757b;
    padding: 20px;
    z-index: 6;
    color: #FFF;
    position: absolute;
    top: 10%;
    right: 10%;  
    &__btn {
        margin-right: 20px;
    }
}

</style>