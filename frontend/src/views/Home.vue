<!--PAGE D'ACCUEIL PRESENTANT LES ACCES AUX DEUX PLATEFORMES-->
<template>
    <div class="container">
        <section class="jumbotron row">
            <h1>Bienvenue sur Groupomania, le réseau social interne de votre entreprise !</h1>
            <div class="card col-12 col-sm-6">
                <h2>Partagez vos articles préférés</h2>
                <router-link to="/api/articles">Accès au Forum Groupomania Articles</router-link>
            </div>
            <div class="card col-12 col-sm-6">
                <h2>Partagez vos vidéos préférées</h2>
                <router-link to="/api/gifs">Accès au Forum Groupomania Vidéos</router-link>
            </div>
            <router-view />
        </section>
        
        <div>
            <Footer />
        </div>
    </div> 
</template>


<script>
import Footer from "../components/Footer"
export default {
	name: "Home",
	components: {
		Footer
	},
	data() {
		return {}
    },
	computed: {
	},
	methods: {
	}
}
</script>

<style>
    
</style>