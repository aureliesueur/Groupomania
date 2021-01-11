<!--PAGE D'ACCUEIL PRESENTANT LES ACCES AUX DEUX PLATEFORMES-->
<template>
    <div>
        <section class="jumbotron">
            <h1>Bienvenue sur Groupomania, le réseau social interne de votre entreprise !</h1>
            <div class="card">
                <h2>Partagez vos articles préférés</h2>
                <router-link to="/articles">Accès au Forum Groupomania Articles</router-link>
            </div>
            <div class="card card-body">
                <h2>Partagez vos vidéos préférées</h2>
                <router-link to="/gifs">Accès au Forum Groupomania Vidéos</router-link>
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