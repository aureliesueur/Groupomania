<script>
export default {
	name: "ArticlesItem",
	props: {
        id: {
            type: Number,
            required: true
        },
		title: {
			type: String,
			required: true
		},
        description: {
			type: String,
			required: true
		},
        subject: {
			type: String,
			required: true
		},
        lien_web: {
			type: String,
            //default : ""
		},
		username: {
			type: String,
			required: true
		},
		date_post: {
			type: String,
			required: true
		},
	},
    data() {
        return {
        }
    }
}
</script>

<template>
    <div class="card container">
        <div v-if="this.$route.name == 'articles-list'" class="row">
            <div class="card-body col-12 col-md-9">
                <h3 class="card-title card__title">{{ title }}</h3>
                <p class="card-subtitle card__subtitle">{{ subject }}</p>
                <p class="card__date">Article posté le : {{ new Date(date_post).toLocaleDateString('fr-CA') }} par {{ username }}</p>
            </div>
            <a class="btn btn-secondary card__link col-4 col-md-3" :href="'/api/articles/' + id" >En savoir plus</a>
        </div>
        
        
        <div v-else class="row">
            <div class="card-body col-12 col-md-9">
                <h3 class="card-title card__title">{{ title }}</h3>
                <p class="card-subtitle card__subtitle">{{ subject }}</p>
                <p class="card__date">Article posté le : {{ new Date(date_post).toLocaleDateString('fr-CA') }} par {{ username }}</p>
                <p class="card-text card__description">{{ description }}</p>
            </div>
            <a :href="lien_web" target="_blank" class="card-link btn btn-primary card__link col-4 col-md-3" >Lien vers l'article</a>
        </div>
    </div>
</template>

<style lang="scss">

</style>