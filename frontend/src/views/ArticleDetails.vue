<!--PAGE D'AFFICHAGE DES DETAILS D'UN ARTICLE-->
<template>
    <div class="jumbotron">
        <h1>Cet article vous intéresse : découvrez tous les détails...</h1>

        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Footer from "../components/Footer"
export default {
    name: "ArticleDetails",
    components: {
		Footer,
	},
    data () {
        return {
        }
    },
}
</script>

<style>
    
</style>