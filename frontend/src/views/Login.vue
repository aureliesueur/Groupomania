<!--PAGE DE CONNEXSION D'UN USER PRESENT DANS LA BDD : LOGIN-->

<template>
    <div class="jumbotron">
        <div v-if="!submitted" class="jumbotron container">
            <h1>Entrez vos identifiants de connexion</h1>
            <ValidationObserver v-slot="{ invalid, handleSubmit }">
                <form class="row formLogin" @submit.prevent="handleSubmit(loginSubmit)">
                    <div class="form-group col-12 col-md-6 text-center">
                        <label for="email">Votre email</label>
                        <ValidationProvider name="user.email" rules="required|email">
                            <div slot-scope="{ errors }">
                                <input 
                                    id="email" 
                                    type="email" 
                                    v-model="email" 
                                    placeholder="pauline.martin@free.fr" 
                                    required 
                                    autofocus
                                    class="form-control">
                                <p class="error">{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group col-12 col-md-6 text-center">
                        <label for="password">Votre mot de passe</label>
                        <ValidationProvider name="user.password" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                       id="password" 
                                       type="password" 
                                       v-model="password" 
                                       required
                                       class="form-control"
                                       placeholder="Bidibul75">
                                <p class="error">{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <button class="btn btn-success auth__btn" type="submit" v-bind:disabled="invalid">Valider</button>
                </form>
                <p id="message">{{ errorMessage }}</p>
            </ValidationObserver>
        </div>

        <Footer />
    </div>
</template>

<script>
import Footer from "../components/Footer"
import UsersDataServices from "../services/UsersDataServices"
import { mapMutations } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
    
export default {
    name: 'Login',
    components: {
        Footer, ValidationProvider, ValidationObserver
    },
    data () {
        return {
            email: "",
            password: "",
            submitted: false,
            errorMessage: ""
        }
    },
    methods: {
        ...mapMutations([
            'setUserId',
            'setToken',
            'setIsAdmin'
        ]),
        loginSubmit() {
            var data = {
                email: this.email,
                password: this.password
            };
            UsersDataServices.login(data) 
                .then(response => {
                    this.setUserId(response.data.userId);
                    this.setToken(response.data.token);
                    this.setIsAdmin(response.data.isAdmin);
                    this.submitted = true;
                    this.$router.push('/');
                })
                .catch(error => {
                    console.log(error);
                    if (error.response.status === 401) {
                        this.errorMessage = "Mot de passe incorrect !";
                    } else if (error.response.status === 429) {
                        this.errorMessage = "Vous avez dépassé le nombre maximal de tentatives, merci de réessayer ultérieurement.";
                    } else if (error.response.status === 404) {
                        this.errorMessage = "Cet email est invalide ou ne correspond à aucun utilisateur connu.";
                    }
                })
        }
    }
}

</script>

<style scoped lang="scss">

//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;
    
.formLogin {
    justify-content: center;
    margin: auto;
    max-width: 60%!important;
}
    
h1 {
    color: $color-primary;
}
    
#message {
    display: inline block;
    margin: auto;
    color: $color-primary;
    font-weight: bold;
}
    
.error {
    font-weight: bold;
    color: $color-primary;
}
    
//Média query pour adapter la page au smartphone
@media screen and (max-width : 768px) {  
    .formLogin {
    justify-content: center;
    margin: auto;
    max-width: 80%!important;
    }
 }
    
//Média query pour adapter la page à la tablette
@media screen and (min-width : 768px) and (max-width : 1024px) { 
     .formLogin {
    justify-content: center;
    margin: auto;
    max-width: 80%!important;
    }
}
    
</style>

