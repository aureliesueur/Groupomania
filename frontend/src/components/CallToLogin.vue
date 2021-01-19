<template>
    <div id="call-to-login">
        <h2>Pour profiter des fonctionnalités de cette plate-forme, merci de vous identifier ou de créer un compte !</h2>
        <router-link to="/api/auth/signup" class="auth__signup"><button  type= "button" class="btn btn-primary">Inscription</button></router-link>
        <router-link to="/api/auth/login" class="auth__login"><button type= "button" class="btn btn-primary">Connexion</button></router-link>
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
    
#call-to-login {
    position: absolute;
    top: 40%;
    z-index: 2;
    background-color: #DDD;
    border-radius: 20px;
    border: 2px solid #cc2810;
    padding: 50px;
}
    
</style>