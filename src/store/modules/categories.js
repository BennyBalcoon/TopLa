import axios from '../../services/axios'

export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {

    },
    actions: {
        fetchCategories(context) {
            return axios.get('/api/v1/categories')
            .then((res) => {
                const categories = res.data
                context.commit('setItems', {resource: 'categories', items: categories}, {root: true})
                return context.state.items
            })
        }
    },
    mutations: {

    }
}