<script>
export default {
	name: "ArticlesItem",
	props: {
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
		imageURL: {
			type: String,
		},
		user_id: {
			type: Number,
			required: true
		},
		date_post: {
			type: String,
			required: true
		}
	}
}
</script>

<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-subtitle">{{ subject }}</p>
            <p>Article posté le : {{ new Date(date_post).toLocaleDateString('fr-CA', options) }} par {{ user_id }}</p>
            <p class="card-text">{{ description }}</p>
            <iframe :src="lien_web" class="card-link btn btn-primary" target="_blank" width="150" height="100" sandbox>
                <p><a :href="lien_web" target="_blank" class="card-link btn btn-primary">Lien vers l'article</a></p>
            </iframe>
        </div>
    </div>
</template>

<style lang="scss">

</style>