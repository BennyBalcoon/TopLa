import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import adverts from './modules/adverts'
import categories from './modules/categories'
import users from './modules/users'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        adverts,
        categories,
        users,
        auth,
    },
    plugins: [createPersistedState(
    // {
    //     reducer: persistedState => {
    //         const Run = { ...persistedState.run }
    //           const Compile = { ...persistedState.compile }
    //           delete Compile.solVersions
    //           delete Run.isProviderSet
    //           delete Run.providerInstance
    //           delete Run.privateKey
    //           delete Run.isPrivateKeySet
    //           delete Run.deployedContracts
    //           delete Run.accountsLoading
    //           delete Run.receipts
    //           return { ...persistedState, run: Run, compile: Compile } 
    //     }
    // }
    )], 
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