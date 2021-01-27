import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { ValidationProvider, extend } from "vee-validate"
import { required, email } from "vee-validate/dist/rules"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faFileVideo } from '@fortawesome/free-solid-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faUserPlus, faSignInAlt, faSignOutAlt, faTrashAlt, faEdit, faNewspaper, faFileVideo, faInfoCircle, faArrowLeft, faEye, faPlusSquare)

//Configuration de Vee-Validate
extend("required", {
    ...required,
    message: "Ce champ est obligatoire"
})
extend("email", {
    ...email,
    message: "Cet email n'est pas valide"
})
extend('minmax', {
    validate(value, { min, max }) {
        return value.length >= min && value.length <= max;
    },
    params: ['min', 'max'],
    message: "Ce champ a trop ou pas assez de caractères"
})


Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

//Configuration du store de Vuex
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        userId: null,
        token: null,
        isAdmin: null
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setToken(state, token) {
            state.token = token;
        },
        setIsAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;
        }, 
        logout(state) {
            state.userId = null;
            state.isAdmin = null;
            state.token = null;
        }
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        isUserAdmin(state) {
            if(state.isAdmin == 1) {
                return true;
            }
        }
    }
})

new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount('#app')

