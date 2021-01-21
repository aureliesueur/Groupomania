<template>
    <div>
        <div class="card text-center">
            <div class="card-header card__header">
                <p>Commentaire posté le : {{ new Date(date_post).toLocaleDateString('fr-CA') }} par {{ username }}</p>
            </div>
            <div class="card-body">
                <p class="card-text card__text ">{{ content }}</p>
            </div>
        </div>
    </div>
</template>


<script>
    
export default {
	name: "CommentsItem",
	props: {
        id: {
            type: Number,
            required: true
        },
		content: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		date_post: {
			type: String,
			required: true
		}
	}
}
    
</script>



<style scoped lang="scss">

.card {
    font-size: 0.8em!important;
    &__header {
        color: #cc2810!important; 
        font-style: italic;
        text-align: left;
        height: 40px!important;
    }
    &__body {
        margin: auto!important;
        margin: 0!important;
    }   
}

</style>