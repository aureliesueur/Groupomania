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
		},
		username: {
			type: String,
			required: true
		},
		date_post: {
			type: String,
			required: true
		}
	},
    data() {
        return {
        }
    },
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-subtitle">{{ subject }}</p>
            <p>Article posté le : {{ new Date(date_post).toLocaleDateString('fr-CA') }} par {{ username }}</p>
            <p class="card-text card__description">{{ description }}</p>
            <p class="card__link"><a :href="lien_web" target="_blank" class="card-link btn btn-primary" >Lien vers l'article</a></p>
        </div>
    </div>
</template>

<style lang="scss">

</style>