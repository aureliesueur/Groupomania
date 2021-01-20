<!--Component d'identification présent sur toutes les pages-->
<template>
    <div class="auth">
        <router-link to="/api/auth/signup" class="auth__signup"><button  type= "button" class="btn btn-primary auth__btn">Inscription</button></router-link><br/>
        <router-link to="/api/auth/login" class="auth__login"><button type= "button" class="btn btn-primary auth__btn">Connexion</button></router-link>
        <router-view />
    </div>
</template>

<script>
    
export default {
  name: 'Identification',
  props: {
    }
}
</script>


<style scoped lang="scss">
    
.auth {
    position: absolute;
    right: 20px;
    top: 10px;
    &__btn {
        margin-bottom: 10px!important;
        background-color: #FFF!important;
        border: 2px solid #cc2810!important;
        color: black!important;
    }
}    
</style>