<!--COMPONENT APPARAISSANT QUAND LE USER N'EST PAS CONNECTE ET QU'IL CLIQUE SUR LE MENU OU SUR LES BOUTONS, POUR EXIGER QU'IL SE CONNECTE OU S'INSCRIVE-->

<template>
    <div class="call">
        <h2>Pour profiter des fonctionnalités de cette plate-forme, merci de vous identifier ou de créer un compte !</h2>
        <router-link to="/auth/signup" class="call__signup"><button  type= "button" class="btn btn-primary auth__btn"><i class="fas fa-user-plus"></i> Inscription</button></router-link>
        <router-link to="/auth/login"><button type= "button" class="btn btn-primary auth__btn"><i class="fas fa-sign-in-alt"></i> Connexion</button></router-link>
        <router-view />
    </div>
</template>

<script>
    
export default {
    name: "CallToLogin"
}
    
</script>

<style scoped lang="scss">
    
.call {
    position: absolute;
    top: 35%;
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