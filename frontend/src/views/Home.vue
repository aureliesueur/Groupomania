<!--PAGE D'ACCUEIL PRESENTANT LES ACCES AUX DEUX PLATEFORMES-->

<template>
    <main>
        <div class="introPage">
            <!--Si le user est connecté, les liens vers les plateformes sont disponibles et cliquables-->
            <section v-if="isLoggedIn" class="container jumbotron text-center intro">
                <div>
                    <h1 class="intro__title">Bienvenue sur Groupomania, le réseau social de votre entreprise !</h1>
                </div>
                <div class='row intro__box text-center'>
                    <div class="card col-12 col-sm-5 intro__articles">
                        <h2 class="card__title">Partagez vos articles préférés</h2>
                        <span class="card__icon"><i class="fas fa-newspaper"></i></span>
                        <router-link to="/articles" aria-label="Lien vers la plateforme d'articles"><button class="btn btn-primary card__btn">Accès au Forum Groupomania Articles</button></router-link>
                    </div>
                    <div class="card col-12 col-sm-5 intro__gifs">
                        <h2 class="card__title">Partagez vos vidéos préférées</h2>
                        <span class="card__icon"><i class="fas fa-file-video"></i></span>
                        <router-link to="/gifs" aria-label="Lien vers la plateforme Gifs"><button class="btn btn-primary card__btn">Accès au Forum Groupomania Vidéos</button></router-link>
                    </div>
                    <router-view />
                </div>
            </section>

            <!--Si le user n'est pas connecté, les liens vers les plateformes ne sont pas disponibles, ils renvoient le user au la page de connexion/inscription via le "CallToLogin"-->
            <section v-else class="container jumbotron text-center intro">
                <h1 class="intro__title">Bienvenue sur Groupomania, le réseau social de votre entreprise !</h1>
                <div class='row intro__box text-center'>
                    <div class="card col-12 col-sm-5 intro__articles">
                        <h2 class="card__title">Partagez vos articles préférés</h2>
                        <span class="card__icon"><i class="fas fa-newspaper"></i></span>
                        <button class="btn btn-primary card__btn" @click="callToLogin">Accès au Forum Groupomania Articles</button>
                    </div>
                    <div class="card col-12 col-sm-5 intro__gifs">
                        <h2 class="card__title">Partagez vos vidéos préférées</h2>
                        <span class="card__icon"><i class="fas fa-file-video"></i></span>
                        <button class="btn btn-primary card__btn" @click="callToLogin">Accès au Forum Groupomania Vidéos</button>
                    </div>
                    </div>
            </section>

            <!--Importation du component CallToLogin-->
            <CallToLogin v-if="loginCalled" />

            <div> 
                <!--Importation du component Identification-->
                <Identification
                :logout="logout"
                :isUserAdmin="isUserAdmin"
                :isLoggedIn="isLoggedIn"
                 />
                <div class="info">
                    <!--Si le user est connecté et non-administrateur, l'icône de son compte s'afficher-->
                    <button v-if="isLoggedIn && !isUserAdmin" class="btn btn-primary auth__btn info__btn" @click="showAccount"><i class="fas fa-user"></i> Votre compte</button>
                </div>
            </div>

            <!--Ecran qui détaille les données du compte-->
            <div v-if="accountAsked" class="account">
                <span id="user-icon"><i class="fas fa-user"></i></span>
                <h3>Détails de votre compte</h3>
                <p>Pseudo : {{ username }}</p>
                <p>Email: {{ email }}</p>
                <p>Prénom: {{ first_name }}</p>
                <p>Nom: {{  last_name }}</p>
                <button class="btn account__btn" @click="confirmDelete"><i class="far fa-trash-alt"></i> Supprimer votre compte</button>
                <button class="btn account__btn" @click="hideAccount"><i class="fas fa-arrow-left"></i> Retour</button>
            </div>
            <!--Ecran qui demande confirmation pour la suppression du compte-->
            <div v-if="confirmation" class="confirmSuppress">
                <p>Etes-vous sûr de vouloir supprimer votre compte ? Toute suppression est définitive.</p>
                <button type= "button" class="btn confirmSuppress__btn" @click="suppressUser">Supprimer</button>
                <button type= "button" class="btn confirmSuppress__btn" @click="refreshPage">Annuler</button>
            </div>
        </div> 
        <!--Importation du component Footer-->
        <Footer />
    </main>
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
		Footer, CallToLogin, Identification 
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
        //Utilisation de Vuex pour déterminer les rôles et les autorisations du user (toutes ces informations étant conservées dans le store Vuex)
        ...mapGetters(['isLoggedIn']),
        ...mapGetters(['isUserAdmin']),
        ...mapState({ userId: "userId"}),
        ...mapState({ token: "token"})
	},
	methods: {
        //Fonction d'appel du component CallToLogin
        callToLogin() {
            if (this.isLoggedIn == false) {
                this.loginCalled = true;
            }
        },
        //Fonction de déconnexion
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
            localStorage.clear();
        },
        //Fonction d'affichage des données du user courant
        showAccount() {
            this.accountAsked = true
        },
        //Fonction de masquage des données du compte
        hideAccount() {
          this.accountAsked = false
        },
        /**
        *Fonction de récupération des données du user courant via une requête Axios GET
        * @param {Number} userId
        * @return {Object} currentUser
        */
        showUser() {
            UsersDataServices.getCurrentUser(this.userId) 
                .then(response => {
                    this.currentUser = JSON.parse(JSON.stringify(response.data.data[0]));
                    this.username = this.currentUser.username,
                    this.email = this.currentUser.email,
                    this.first_name = this.currentUser.first_name,
                    this.last_name = this.currentUser.last_name
                    console.log(this.username, this.email);
                })
                .catch(error => console.log(error));
        },
        /**
        *Fonction de suppression du compte user courant via une requête Axios DELETE
        * @param {Number} userId
        */
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
        //Fonction d'affichage de la demande de confirmation de suppression
        confirmDelete() {
            return (this.confirmation = true);
        },
        //Fonction de rafraîchissement de la page
        refreshPage() {
            this.$router.push({ path: "/" });
            this.hideAccount();
            this.confirmation = false;
        },
	},
    //Déclenchement de la récupération des données du user au moment du rendu de la page 
    mounted() {
        this.showUser(this.userId);
    },
}
</script>


<style lang="scss">
 
$color-primary: #cc2810;
$color-secondary: #324392;
$color-tertiary: #6f757b;
    
.introPage {
    background: url("/images/network7.jpg") no-repeat!important;
    background-size: cover!important;
    transparency: 0.6;
    z-index: 0;
}
.intro {
    margin-bottom: 0!important;
    padding-top: 90px!important;
    background: none!important;
    z-index: 3;
    padding-bottom: 100px!important;
    &__title {
        background: rgba(250, 250, 250, 0.7);
        padding: 10px;
        color: #000;
    }
    &__box {
        margin-top: 80px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    &__title {
        margin-top: 150px;
    }
    &__articles {
        margin-right: 20px!important;
    }
}
  
.card {
    justify-content: center;
    padding: 10px;
    &__title {
        margin-bottom: 0!important;
    }
    &__icon {
        font-size: 2em;
        color: #000;
        margin-top: 20px;
    }
    &__btn {
        margin-top: 0;
        margin-bottom: 10px!important;
    }
}
    
#user-icon {
    color: #FFF;
    font-size: 2em;
}

.info {
    position: fixed;
    right: 20px;
    top: 70px;
    z-index: 4;
    color: #FFF;
    margin-right: -20px;
    width: 200px;
    &__btn {
        font-size: 0.9em!important;
    }
} 
     
.account {
    background: $color-secondary;
    border: 2px solid #FFF;
    border-radius: 10px;
    box-shadow: 3px 3px 5px $color-tertiary;
    padding: 20px;
    z-index: 4;
    color: #FFF;
    position: absolute;
    right: 20px;
    top: 20px;
    width: 400px;
    &__btn {
        font-size: 0.9em!important;
        margin-right: 10px;
    }
}
    
.confirmSuppress {
    background: $color-secondary;
    border: 2px solid #FFF;
    border-radius: 10px;
    box-shadow: 3px 3px 5px $color-tertiary;
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
  
    
/*ANIMATION A L'ARRIVEE SUR LA PAGE*/
    
.intro__articles, .intro__gifs {
    animation: revelation 700ms both ease-in-out;
}
    
.intro__title {
    animation: reverseRevelation 700ms both ease-in-out;
}
    
 
/*MEDIA QUERIES POUR ASSURER UNE MISE EN PAGE RESPONSIVE */
    
//Média query pour adapter la page à la tablette
@media screen and (min-width : 768px) and (max-width : 1024px) { 
    .info {
        right: 60px!important;
    }
    .card {
        padding-bottom: 30px!important;
    }
}
    
    
//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {  
    .intro__box {
        margin-top: 50px;
    }
    .info {
        right: 70px!important;
        top: 70px;
    }
     h2 {
        padding-bottom: 10px!important;
    }
    .btn, .btn-primary {
        font-size: 0.8em!important;
    }
    .account {
        width: 90%;
    }
    .intro {
        padding-bottom: 50px!important;
        &__gifs, &__articles {
            min-height: 150px!important;
            margin-bottom: 40px!important;
        }
        &__articles {
            margin-right: 0px!important;
        }
    }
    .card__icon {
        margin-bottom: 10px;
    }
}
    
//Média query pour régler un détail de mise en page
@media screen and (min-width : 572px) and (max-width : 768px) {
    h2 {
        font-size: 1.2em!important;
        padding-bottom: 10px!important;
    }
}

</style>