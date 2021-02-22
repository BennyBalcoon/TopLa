import axios from '../../services/axios'

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
        fetchAdvertsByCategoryId({state, commit}, categoryId) {
            commit('setItems', {resource: 'adverts', items: []}, {root: true})
            return axios.get(`/api/v1/notices/category/${categoryId}`)
            .then((res) => {
                const adverts = res.data;
                commit('setItems', {resource: 'adverts', items: adverts}, {root: true})
                return state.items
              }); 
        },
        fetchAdvertsByUser({state, commit}) {
            commit('setItems', {resource: 'adverts', items: []}, {root: true})
            return axios.get('api/v1/users/profil/mes-annonces')
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
                console.log(advert);
                commit('setItem', {resource: 'adverts', item: advert}, {root: true})
                return state.item
            })
        },
        fetchAdvertsByTitle({state, commit}, title) {
            commit('setItems', {resource: 'adverts', items: []}, {root: true})
            return axios.get(`/api/v1/notices?title=${title}`)
            .then((res) => {
                const adverts = res.data
                commit('setItems', {resource: 'adverts', items: adverts}, {root: true})
                return state.items
            })
        },
        createAdvert({rootState}, advertToCreate) {
            console.log(advertToCreate);
            advertToCreate.adv_usrid = rootState.auth.user.id
            advertToCreate.adv_catid = advertToCreate.category

            return axios.post('/api/v1/notices', advertToCreate)
                .then((res) => {
                   return res.data
                }).catch((err) => {
                    console.log({err});
                })
        },
        deleteAdvert(_, advertId) {
            return axios.delete(`/api/v1/notices/${advertId}`)
                .then((res) => {
                    return res.data
                })
        }
    },
    mutations: {

    }
}