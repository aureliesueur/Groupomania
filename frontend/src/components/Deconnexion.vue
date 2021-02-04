<!--COMPONENT DE DECONNEXION PRESENT SUR TOUTES LES PAGES-->

<template>
    <div>
        <button type="button" class="btn btn-secondary deconnect__btn" @click="logout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Déconnexion</button>
        <div class="info">
            <p v-if="isUserAdmin">ADMINISTRATEUR CONNECTE</p>
            <button v-else class="btn btn-primary auth__btn info__btn" @click="showAccount"><font-awesome-icon :icon="['fas', 'user']" /> Votre compte</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Deconnexion',
        props: {
            logout: {
                type: Function
            },
            showAccount: {
                type: Function
            }
        }
    }
</script>

<style>
    
</style>