import axios from 'axios'

export default {
    namespaced: true,
    state: {
        items: [],
        item: {}
    },
    getters: {

    },
    actions: {
        fetchAdverts({state, commit}) {
            commit('setItems', {resource: 'adverts', items: []}, {root: true})
            return axios.get("/api/v1/notices")
            .then((res) => {
                const adverts = res.data;
                commit('setItems', {resource: 'adverts', items: adverts}, {root: true})
                return state.items
              }); 
        },
        fetchAdvertById({state, commit}, advertId) {
            commit('setItem', {resource: 'adverts', item: {}}, {root: true})
            return axios.get(`/api/v1/notices/${advertId}`)
            .then((res) => {
                const advert = res.data
                commit('setItem', {resource: 'adverts', item: advert}, {root: true})
                return state.item
            })
        }
    },
    mutations: {

    }
}