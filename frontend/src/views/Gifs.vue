<!--PAGE D'ACCUEIL DU FORUM GIFS, A DEVELOPPER-->

<template>
    <div>
        <div class="gifs jumbotron">
            <h1>Plateforme de partage de Gifs : A développer...</h1>
        </div>  

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
import { mapGetters, mapState } from 'vuex'
    
export default {
    name: "Gifs",
    components: {
        Identification, Footer
    }, 
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        ...mapState({ token: "token"}),
        ...mapGetters(['isUserAdmin'])
    },
    methods: {
        logout() {
            this.$store.commit("logout")
        }
    }
}
</script>

<style>
    
</style>