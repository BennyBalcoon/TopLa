import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage'
import AdvertsPage from '../pages/AdvertsPage'
import AdvertDetailPage from '../pages/AdvertDetailPage'
import AdvertCreatePage from '../pages/AdvertCreatePage'
import ErrorPage from '../pages/ErrorPage'

Vue.use(Router)

const router = new Router({
   routes: [{
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    },
    {
        path: '/recherche',
        name: 'AdvertsPage',
        component: AdvertsPage 
    },
    {
        path: '/annonce/:id',
        name: 'AdvertDetailPage',
        component: AdvertDetailPage 
    },
    {
        path: '/creer-annonce',
        name: 'AdvertCreatePage',
        component: AdvertCreatePage 
    },
    {
        path: '*',
        name: 'ErrorPage',
        component: ErrorPage
    }
],
    mode: 'history'
})

export default router