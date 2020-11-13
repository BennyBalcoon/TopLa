import axios from 'axios'

const axiosInstance = axios.create({
    timeout: 5000,
    baseURL: window.location.host === 'topla.herokuapp.com' ? 'https://topla-server.herokuapp.com' : undefined,
    headers: {'Authorization': `Bearer ${(localStorage.getItem('topla-jwt') || '')}`}
})

export default axiosInstance