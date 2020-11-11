import axios from 'axios'

const axiosInstance = axios.create({
    timeout: 3000,
    headers: {'Authorization': `Bearer ${(localStorage.getItem('topla-jwt') || '')}`}
})

export default axiosInstance