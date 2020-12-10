import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage'
import AdvertsPage from '../pages/AdvertsPage'
import AdvertDetailPage from '../pages/AdvertDetailPage'
import AdvertCreatePage from '../pages/AdvertCreatePage'
import AdvertEditPage from '../pages/AdvertEditPage'
import ProfilePage from '../pages/ProfilePage'
import ErrorPage from '../pages/ErrorPage'
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
        component: AdvertsPage,
        props: (route) => ({ query: route.query.query})
    },
    {
        path: '/recherche/categories/:categoryId/:category',
        name: 'AdvertsByCategoryPage',
        component: AdvertsPage ,
        props: true
    },
    {
        path: '/annonce/nouvelle',
        name: 'AdvertCreatePage',
        component: AdvertCreatePage ,
        meta: {onlyAuthUser: true}
    },
    {
        path: '/annonce/:advertId',
        name: 'AdvertDetailPage',
        component: AdvertDetailPage,
        props: true
    },
    {
        path: '/annonce/:advertId/modifier',
        name: 'AdvertEditPage',
        component: AdvertEditPage,
        meta: {onlyAuthUser: true},
        props: true
    },
    {
        path: '/profil/',
        name: 'ProfilePage',
        component: ProfilePage,
        meta: {onlyAuthUser: true}
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