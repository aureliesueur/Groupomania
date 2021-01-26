<template>
    <div>
        <div v-if="this.$route.name == 'articles-list'" class="card text-center">
            <div class="card-body">
                <h3 class="card-title card__title">{{ title }}</h3>
                <p class="card-subtitle card__subtitle">{{ subject }}</p>
                <p class="card__date">Article posté le : {{ new Date(date_post).toLocaleDateString('fr-CA') }} par {{ username }}</p>
            </div>
            <a class="btn btn-secondary card__btnDetails col-4 col-md-3" :href="'/articles/' + slug">En savoir plus</a>
        </div>
        
        
        <div v-else class="card text-center">
            <div class="card-header card__header">
                <a href="#commentsList">Voir tous les commentaires</a>
                <a :href="'/articles/' + slug + '/comments'">Poster un commentaire</a>
            </div>
            <div class="card-body card__body ">
                <h3 class="card-title card__title">{{ title }}</h3>
                <p class="card-subtitle card__subtitle">{{ subject }}</p>
                <p class="card__date">Article posté le : {{ new Date(date_post).toLocaleDateString('fr-CA') }} par {{ username }}</p>
                <p class="card-text card__description">{{ description }}</p>
            </div>
            <div card__links>
                <a :href="lien_web" target="_blank" class="btn btn-primary card__btnWeb" >Lien vers l'article</a>
                <iframe  :src="lien_web" width="200px" height="200px" sandbox class="card__iframe"></iframe>
            </div>
        </div>
    </div>
</template>


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
        slug: {
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
		}
	},
    data() {
        return {
        }
    },
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push({ path: "/" });
        }
    }
}
</script>


<style scoped lang="scss">
    
.card {
    border: 2px solid #324392!important;
    padding: 10px!important;
    margin: auto;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 2px #CCC;
    &__header {
        color: #324392;
        font-style: italic;
        text-align: right;
        display: flex;
        justify-content: space-between;
        height: 50px!important;
        & a {
            margin: 0px!important;
            color: #324392!important;
            &:hover {
               text-decoration: none;
               color: #cc2810!important; 
            }
        }
    }
    &__body {
        margin: auto!important;
        width: 80%!important;
    }
    &__title {
        color: #cc2810;
    }
    &__subtitle {
        font-style: italic;
        font-weight: bold;
    }
    &__description {
        text-align: justify;
    }
    &__links iframe, a {
        display: block;
        margin: auto;
    }
    &__links iframe {
        margin-bottom: 20px!important;
    }
    &__btnWeb {
        margin-top: 10px!important;
        max-width: 30%;
    }
   
}

</style>