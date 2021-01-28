<template>
    <div>
        <div v-if="this.$route.name == 'articles-list'" class="card text-center">
            <div class="card-body card__body">
                <h3 class="card-title card__title">{{ title }}</h3>
                <p class="card-subtitle card__subtitle">{{ subject }}</p>
                <p class="card__date">Article posté le : {{ new Date(date_post).toLocaleDateString('fr-CA') }} par {{ username }}</p>
            </div>
            <a class="btn btn-secondary card__btnDetails col-4 col-md-3" :href="'/articles/' + slug"><font-awesome-icon :icon="['fas', 'info-circle']" /> En savoir plus</a>
        </div>
        <div v-else class="card text-center">
            <div class="card-header card__header">
                <ul class="list-group">
                    <li class="list-group-item card__comments">
                        <a href="#commentsList"><font-awesome-icon :icon="['fas', 'eye']" /> Voir tous les commentaires</a>
                        <a :href="'/articles/' + slug + '/comments'"><font-awesome-icon :icon="['fas', 'edit']" /> Poster un commentaire</a>
                    </li>
                    <li class="list-group-item card__thumbs">
                        <div v-if="liked || disliked" >
                            <div v-if="liked" class="thumbs">
                            <span @click="deleteThumb" class="thumbs__up thumbs__red"><i class="far fa-thumbs-up"></i></span>
                            <span class="thumbs__down disabled"><i class="far fa-thumbs-down"></i></span>
                            </div>
                            <div v-else class="thumbs">
                                <span class="thumbs__up disabled"><i class="far fa-thumbs-up"></i></span>
                                <span @click="deleteThumb" class="thumbs__down thumbs__red"><i class="far fa-thumbs-down"></i></span>
                            </div>
                        </div>
                        <div v-else>
                            <div class="thumbs">
                                <span @click="sendLike" class="thumbs__up"><i class="far fa-thumbs-up"></i></span>
                                <span @click="sendDislike" class="thumbs__down"><i class="far fa-thumbs-down"></i></span>
                            </div>
                        </div>
                        <div class="card__stats">
                            <p>{{ totalLikes }} <i class="far fa-thumbs-up"></i></p>
                            <p>{{ totalDislikes }} <i class="far fa-thumbs-down"></i></p>
                        </div>
                    </li>
                </ul>
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
		},
        sendLike: {
			type: Function,
			required: true
		},
        sendDislike: {
			type: Function,
			required: true
		},
        deleteThumb: {
			type: Function,
			required: true
		},
        liked: {
			type: Boolean,
			required: true
		},
        disliked: {
			type: Boolean,
			required: true
		},
        totalLikes: {
			type: Number,
			required: true
		},
        totalDislikes: {
			type: Number,
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
  
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
$color-bkg: #f1f1f2;
    
.card {
    border: 2px solid $color-secondary!important;
    padding: 10px!important;
    margin: auto;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 5px 5px 2px #CCC;
    &__header {
        color: $color-secondary;
        font-style: italic;
        text-align: right;
        padding: 0px;
        & a {
            margin: 0px!important;
            color: $color-secondary!important;
            &:hover {
               text-decoration: none;
               color: $color-primary!important; 
            }
        }
        & li {
            height: 40px!important;
            background: $color-bkg;
        }
    }
    &__comments, &__thumbs, &__stats {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    &__btnDetails {
        margin-top: 0px!important;
    }
    &__body {
        margin: auto!important;
        padding-bottom: 0px!important;
        width: 80%!important;
    }
    &__title {
        color: $color-primary;
        margin-bottom: 10px!important;
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

.thumbs {
    font-size: 1.5em;
    margin-top: -8px!important;

    &__up {
        margin-right: 10px;
    }
    &__up:hover, &__down:hover {
        color: $color-primary;
    }
    &__red {
       color: $color-primary;
    }
}
    
.disabled {
    color: lighten($color-secondary, 40%);
    &:hover {
        color: lighten($color-secondary, 40%);
    }
}

</style>