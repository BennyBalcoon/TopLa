import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import adverts from './modules/adverts'
import categories from './modules/categories'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        adverts,
        categories,
        auth,
    },
    plugins: [createPersistedState()], 
    // simple functions to mutate the state
    mutations: {
        // setCategories(state, categories) {
        //    state.categories = categories 
        // },
        // setAdverts(state, adverts) {
        //     state.adverts = adverts
        // },
        // setAdvert(state, advert) {
        //     state.advert = advert
        // }

        // improvment :
        
            setItems(state, {
                resource,
                items
            }) {
                state[resource].items = items
            },
            setItem(state, {
                resource,
                item
            }) {
                state[resource].item = item
            },
        }
    }
)