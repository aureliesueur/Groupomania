<!--PAGE D'INSCRIPTION D'UN NOUVEAU USER -->

<template>
    <div class="jumbotron">
        <h1>Vous souhaitez rejoindre la communauté Groupomania ?</h1>
        <div v-if="!submitted" class="container text-center">
            <h2>Merci de remplir les champs suivants :</h2>
            <div class="formSignup row">
                <div class="formSignup__box col-12 col-md-7">
                    <div class="form-group ">
                        <label for="username">Votre pseudo</label>
                        <ValidationProvider name="user.username" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                   type="text" 
                                   class="form-control"
                                   required
                                   v-model="user.username"
                                   name="username"
                                   placeholder="missKeane"/>
                                <p class="error">{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="email">Votre email</label>
                        <ValidationProvider name="user.email" rules="required|email">
                            <div slot-scope="{ errors }">
                                <input 
                                       type="email" 
                                       class="form-control"
                                       required
                                       v-model="user.email"
                                       name="email"
                                       placeholder="pauline.martin@free.fr"/>
                                <p class="error">{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="password">Votre mot de passe</label>
                        <ValidationProvider name="user.password" rules="required|minmax:3,10">
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
                                <p class="error">{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="first-name">Votre prénom</label>
                        <ValidationProvider name="user.first-name" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                   type="text" 
                                   class="form-control"
                                   v-model="user.first_name"
                                   name="first-name"
                                   placeholder="Pauline"/>
                                <p class="error">{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>
                    <div class="form-group">
                        <label for="last-name">Votre nom</label>
                        <ValidationProvider name="user.last-name" rules="required|minmax:3,10">
                            <div slot-scope="{ errors }">
                                <input 
                                   type="text" 
                                   class="form-control"
                                   v-model="user.last_name"
                                   name="last-name"
                                   placeholder="Martin"/>
                                <p class="error">{{ errors[0] }}</p>
                            </div>
                        </ValidationProvider>
                    </div>

                    <button v-if="foundError===false" class="btn btn-success btn-submit" @click="showErrors">Créer votre compte</button> 
                    <button v-else class="btn btn-success btn-submit" @click="createUser">Créer votre compte</button>
                    
                </div>
            </div>
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
import { ValidationProvider } from 'vee-validate'
    
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
            foundError: false,
            errors: []
        }
    },
    methods: {
        ...mapMutations([
            'setUserId',
            'setToken',
            'setIsAdmin'
        ]),
        createUser(e) { 
            e.preventDefault()
            var data = {
                username: this.user.username,
                email: this.user.email,
                password: this.user.password,
                first_name: this.user.first_name,
                last_name: this.user.last_name
            };
            UsersDataServices.signup(data) 
                .then(response => {
                    console.log(response.data);
                    this.setUserId(response.data.userId);
                    this.setToken(response.data.token);
                    this.setIsAdmin(response.data.isAdmin);
                    this.submitted = true;
                    this.$router.push('/');
                })
                .catch(error => console.log(error));
        },
        showErrors() {
            if (this.errors !== []) {
                this.foundError = true;
                this.submitted = false;
                this.errors = [];
            } else {
                this.createUser();
            }
        }
    }
}
</script>


<style scoped lang="scss">
    
//Déclaration variables SASS
$color-primary: #cc2810;
$color-secondary: #324392;    
 
.error {
    font-weight: bold;
    color: $color-primary;
}
    
.btn-submit {
    margin-top: 20px!important;
    margin-bottom: 40px!important;
}
    
    
//Média query pour adapter la page à la tablette
@media screen and (min-width : 768px) and (max-width : 1024px) { 
     .formSignup__box {
        margin: auto!important;
    }
}
    
</style>

