<template>
    <div class="call">
        <h2>Pour profiter des fonctionnalités de cette plate-forme, merci de vous identifier ou de créer un compte !</h2>
        <router-link to="/auth/signup" class="call__signup"><button  type= "button" class="btn btn-primary auth__btn">Inscription</button></router-link>
        <router-link to="/auth/login"><button type= "button" class="btn btn-primary auth__btn">Connexion</button></router-link>
        <router-view />
    </div>
</template>

<script>
    
export default {
    name: "CallToLogin",
	props: {
        /*condition: {
            type: Boolean,
            required: true
        }*/
    }
}
    
</script>

<style scoped lang="scss">
    
.call {
    position: absolute;
    top: 40%;
    z-index: 2;
    max-width: 50%;
    margin-left: 20%;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid #cc2810;
    padding: 50px;
    &__signup {
        margin-right: 20px;
    }
}
    
//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {  
    .call {
        top: 30%;
        max-width: 95%;
        margin-left: 2%;
    }
}
    
</style>