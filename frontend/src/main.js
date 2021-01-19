import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import createPersistedState from 'vuex-persistedstate'

Vue.use(BootstrapVue)
Vue.use(Vuex)

Vue.config.productionTip = false

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
        }/*, 
        logout(state) {
            state.userId = null;
            state.isAdmin = null;
        }*/
    },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
    }
})

new Vue({
    router,
    store: store,
    render: h => h(App)
}).$mount('#app')

