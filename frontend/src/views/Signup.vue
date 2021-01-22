<!--PAGE DE CONNEXSION D'UN USER PRESENT DANS LA BDD : LOGIN-->

<template>
        <div class="jumbotron">
        <h1>Vous souhaitez rejoindre la communauté Groupomania ?</h1>
        <div v-if="!submitted" class="container text-center">
            <h2>Merci de remplir les champs suivants :</h2>
            <form class="row">
                <div class="form__box col-10 col-md-7" @submit.prevent='handleSubmit'>
                    <div class="form-group">
                        <label for="username">Votre pseudo</label>
                        <ValidationProvider name="username" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                   type="text" 
                                   class="form-control"
                                   required
                                   v-model="user.username"
                                   name="username"
                                   placeholder="missKeane"/>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="email">Votre email</label>
                        <ValidationProvider name="email" rules="required|email">
                            <div slot-scope="{ errors }">
                                <input 
                                       type="email" 
                                       class="form-control"
                                       required
                                       v-model="user.email"
                                       name="email"
                                       placeholder="pauline.martin@free.fr"/>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>   
                    <div class="form-group">
                        <label for="password">Votre mot de passe</label>
                        <ValidationProvider name="password" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                   type="password" 
                                   class="form-control"
                                   minlength="6"
                                   maxlength="10"
                                   required
                                   v-model="user.password"
                                   name="password"
                                   placeholder="Bidibul75"/>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="first-name">Votre prénom</label>
                        <ValidationProvider name="first-name" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                   type="text" 
                                   class="form-control"
                                   v-model="user.first_name"
                                   name="first-name"
                                   placeholder="Pauline"/>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Votre nom</label>
                        <ValidationProvider name="last-name" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                   type="text" 
                                   class="form-control"
                                   v-model="user.last_name"
                                   name="last-name"
                                   placeholder="Martin"/>
                                <p>{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    
                    <button class="btn btn-success" @click="showErrors">Créer votre compte</button>
                    <p>{{ message }}</p>
                </div>  
            </form>
        </div>
            
        <div v-else>
            <h3>Votre compte a bien été créé, nous sommes ravis de vous compter parmi nous !</h3>
        </div>
           
        <div>
            <Footer />
        </div>
    </div>
</template>

<script>
import Footer from "../components/Footer"
import UsersDataServices from "../services/UsersDataServices"
import { mapMutations } from 'vuex'
import { ValidationProvider } from 'vee-validate';
    
export default {
    name: 'Signup',
    components: {
        Footer, ValidationProvider
    },
    data () {
        return {
                user: {
                    username: "",
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: ""
                },
            submitted: false,
            message: "",
            errors: []
        }
    },
    methods: {
        ...mapMutations([
            'setUserId',
            'setToken',
            'setIsAdmin'
        ]),
        showErrors() {
            if (this.errors !== []) {
                this.message = "Vous vous êtes trompé dans l'un des champs, recommencez !"
            }
        },
        handleSubmit() {
            var data = {
                username: this.user.username, 
                email: this.user.email,
                password: this.user.password,
                first_name: this.user.first_name,
                last_name: this.user.last_name
            };
            UsersDataServices.signup(data) 
                .then(response => {
                    this.setUserId(response.data.userId);
                    this.setToken(response.data.token);
                    this.setIsAdmin(response.data.isAdmin);
                    this.submitted = true;
                    this.$router.push('/');
                })
                .catch(error => console.log(error));
        }
    }
}

</script>

<style scoped lang="scss">
    
form {
    justify-content: center;
    margin: auto;
    max-width: 60%!important;
}
</style>

