import axios from '../../services/axios'
import jwt from 'jsonwebtoken'

function checkTokenValidity(token) {
    if(token) {
        const decodedToken = jwt.decode(token)

        if (decodedToken && (decodedToken.exp * 1000) > new Date().getTime()) {
            return true
        } else {
            return false
        }
    }

    return false
}

export default {
    namespaced: true,
    state: {
        user: null,
        isAuthResolved: false
    },
    getters: {
        authUser(state) {
            return state.user || null
        },
        isAuthenticated(state) {
            return !!state.user
        }
    },
    actions: {
        loginWithEmailAndPassword({commit}, userData) {
            return axios.post('/api/v1/users/login', userData)
                .then((res) => {
                    const user = res.data
                    localStorage.setItem('topla-jwt', user.token)
                    commit('setAuthUser', user)
                })
        },
        registerUser(context, userData) {
            return axios.post('/api/v1/users/register', userData)
        },
        logout({commit}) {
            return new Promise((resolve) => {
                localStorage.removeItem('topla-jwt')
                commit('setAuthUser', null)
                resolve(true)
            })
        },
        getAuthUser(context) {
            const authUser = context.getters['authUser']
            const token = localStorage.getItem('topla-jwt')
            const isTokenValid = checkTokenValidity(token)

            if (authUser && isTokenValid) {
                return Promise.resolve(authUser)
            }

            const config = {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }

            return axios.get('/api/v1/users/profil', config)
                .then((res) => {
                    const user = res.data
                    console.log(user);
                    localStorage.setItem('topla-jwt', user.token)
                    context.commit('setAuthUser', user)
                    context.commit('setAuthState', true)
                    return user
                })
                .catch((err) => {
                    context.commit('setAuthUser', null)
                    context.commit('setAuthState', true)
                    return err
                })
        },
        updateUser({commit}, user) {
            return axios.patch(`/api/v1/users/${user.id}`, user)
                .then((res) => {
                    const updatedUser = res.data
                    commit('setAuthUser', updatedUser)
                    return updatedUser
                })
        }
    },
    mutations: {
        setAuthUser(state, user) {
            return state.user = user
        },
        setAuthState(state, authState) {
            return state.isAuthResolved = authState
        }
    }
}