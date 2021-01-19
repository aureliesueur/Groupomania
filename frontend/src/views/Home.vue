<!--PAGE D'ACCUEIL PRESENTANT LES ACCES AUX DEUX PLATEFORMES-->
<template>
    <div class="container jumbotron">
        <section class="row">
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
        
        <div v-if="!isLoggedIn">
           <Identification />
        </div>
        
        <div>
            <Footer />
        </div>
    </div> 
</template>


<script>
import Footer from "../components/Footer"
import Identification from "../components/Identification"
import { mapGetters } from 'vuex'
    
    
export default {
	name: "Home",
	components: {
		Footer, Identification
	},
	data() {
		return {
        }
    },
	computed: {
        ...mapGetters(['isLoggedIn']),
	},
	methods: {
	}
}
</script>

<style lang="scss">
 
</style>