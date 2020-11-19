import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage'
import AdvertsPage from '../pages/AdvertsPage'
import AdvertDetailPage from '../pages/AdvertDetailPage'
import AdvertCreatePage from '../pages/AdvertCreatePage'
import ErrorPage from '../pages/ErrorPage'
import SecretPage from '../pages/SecretPage'
import NotAuthenticatedPage from '../pages/NotAuthenticatedPage'

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
        component: LoginPage,
        meta: {onlyGuestUser: true}
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage,
        meta: {onlyGuestUser: true}
    },
    {
        path: '/recherche',
        name: 'AdvertsPage',
        component: AdvertsPage 
    },
    {
        path: '/annonce/nouvelle',
        name: 'AdvertCreatePage',
        component: AdvertCreatePage ,
        meta: {onlyAuthUser: true}
    },
    {
        path: '/annonce/secret',
        name: 'SecretPage',
        component: SecretPage ,
        meta: {onlyAuthUser: true}
        // beforeEnter(to, from, next) {
        //     if (store.getters['auth/isAuthenticated']) {
        //         next()
        //     } else {
        //         next({name: 'NotAuthenticatedPage'})
        //     }
        // }
    },
    {
        path: '/annonce/:id',
        name: 'AdvertDetailPage',
        component: AdvertDetailPage 
    },
    {
        path: '/401',
        name: 'NotAuthenticatedPage',
        component: NotAuthenticatedPage
    },
    {
        path: '*',
        name: 'ErrorPage',
        component: ErrorPage
    }
],
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    store.dispatch('auth/getAuthUser')
      .then(() => {
        const isAuthenticated = store.getters['auth/isAuthenticated']

        if (to.meta.onlyAuthUser) {
            if (isAuthenticated) {
                next()
            } else {
                next({name: 'NotAuthenticatedPage'}) 
            }
        } else if (to.meta.onlyGuestUser) {
            if (isAuthenticated) {
                next({name: 'HomePage'})
            } else {
                next()
            }
        } else {
            next()
        }
        
      })
  })

export default router