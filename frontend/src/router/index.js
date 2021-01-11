import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Gifs from '../views/Gifs.vue'
import Articles from '../views/Articles.vue'
import ArticleDetails from '../views/ArticleDetails.vue'
import PostArticle from '../views/PostArticle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/api/',
    name: 'Home',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

