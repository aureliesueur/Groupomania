import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Gifs from '../views/Gifs.vue'
import Articles from '../views/Articles.vue'
import CommentForm from '../views/CommentForm.vue'
import ArticleDetails from '../views/ArticleDetails.vue'
import PostArticle from '../views/PostArticle.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/api/auth/login',
        name: 'login',
        component: Login
    },
   {
        path: '/api/auth/signup',
        name: 'signup',
        component: Signup
    },
    {
        path: '/api/',
        name: 'home',
        component: Home
    },
    {
        path: '/api/gifs',
        name: 'gifs',
        component: Gifs
    },
    {
        path: '/api/articles/add',
        name: 'post-article',
        component: PostArticle
    },
    {
        path: '/api/articles',
        name: 'articles-list',
        component: Articles
    },
    {
        path: '/api/articles/:id',
        name: 'one-article-details',
        component: ArticleDetails
    },
    {
        path: '/api/articles/:id/comments',
        name: 'comments-list',
        component: CommentForm
    }/*,
    {
        path: '/api/articles/:id/comments/:id',
        name: 'one-comment-details',
        component: CommentDetails
    }*/
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

