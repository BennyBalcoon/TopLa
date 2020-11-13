import axios from 'axios'
import axiosInstance from '@/services/axios'
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
            // return axios.post('api/v1/users/logout')
            //     .then(() => {
            //         context.commit('setAuthUser', null)
            //         return true
            //     })
            //     .catch((err) => {
            //        return err; 
            //     })
            return new Promise((resolve) => {
                localStorage.removeItem('topla-jwt')
                commit('setAuthUser', null)
                resolve(true)
            })
        },
        getAuthUser({commit, getters}) {
            const authUser = getters['authUser']

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

            return axiosInstance.get('/api/v1/users/me', config)
                .then((res) => {
                    const user = res.data
                    console.log(user);
                    localStorage.setItem('topla-jwt', user.token)
                    commit('setAuthUser', user)
                    commit('setAuthState', true)
                    return user
                })
                .catch((err) => {
                    commit('setAuthUser', null)
                    commit('setAuthState', true)
                    return err
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