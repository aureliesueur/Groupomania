<!--PAGE D'ACCUEIL DU FORUM GIFS, A DEVELOPPER-->

<template>
    <div>
        <div class="gifs jumbotron">
            <h1>Plateforme de partage de Gifs : A développer...</h1>
        </div>  

        <Identification />

        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Identification from "../components/Identification"
    
export default {
    name: "Gifs",
    components: {
        Identification
    }
}
</script>

<style>
    
</style>