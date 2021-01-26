<!--Component d'identification présent sur toutes les pages-->
<template>
    <div class="auth">
        <router-link to="/auth/signup" class="auth__signup"><button  type= "button" class="btn btn-primary auth__btn"><font-awesome-icon :icon="['fas', 'user']" /> Inscription</button></router-link><br/>
        <router-link to="/auth/login" class="auth__login"><button type= "button" class="btn btn-primary auth__btn"><font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Connexion</button></router-link>
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
    right: 30px;
    top: 10px;
    font-size: 0.9em!important;
}    
</style>