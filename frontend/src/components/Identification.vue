<!--Component d'identification présent sur toutes les pages-->
<template>
    <div class="auth">
        <div v-if="!isLoggedIn">
            <router-link to="/auth/signup" class="auth__signup"><button type= "button" class="btn btn-primary auth__btn"><font-awesome-icon :icon="['fas', 'user-plus']" /> Inscription</button></router-link><br/>
            <router-link to="/auth/login" class="auth__login"><button type= "button" class="btn btn-primary auth__btn"><font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Connexion</button></router-link>
            <router-view />
        </div>
        <div v-else class="deconnect">
            <button type="button" class="btn btn-secondary deconnect__btn" @click="logout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Déconnexion</button>
            <div class="admin">
                <p v-if="isUserAdmin">ADMINISTRATEUR<br/>CONNECTE</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Identification',
    props: {
        logout: {
            type: Function,
            required: true
        },
        isUserAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        isLoggedIn: {
            type: Boolean,
            required: true,
            default: false
        }
    }
}
</script>


<style scoped lang="scss">
    
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392; 
    
.auth {
    position: fixed;
    right: 0px;
    top: 10px;
    z-index: 4;
    width: 200px;
    &__btn {
        font-size: 0.9em!important;
    }
} 
    
.deconnect {
    position: fixed;
    right: 0px;
    top: 20px;
    z-index: 4;
    width: 200px;
    &__btn {
        font-size: 0.9em!important;
    }
}
    
.admin {
    position: fixed;
    right: 30px;
    top: 70px;
    z-index: 4;
    color: #FFF;    
}
 
    
//Média query pour adapter la page au smartphone
@media screen and (min-width : 768px) and (max-width : 1024px) { 
    .auth, .deconnect {
        right: 80px;
        top: 20px;
    }
    .admin {
        width: 150px!important;
        right: 100px;
    }
}
    
//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {  
    .auth, .deconnect {
        right: 50px;
        top: 20px;
    }
    .btn, .btn-primary {
        font-size: 0.8em!important;
    }
    .admin {
        width: 150px!important;
        right: 80px;
    }
}
    
</style>