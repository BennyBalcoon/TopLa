import axios from 'axios'

const axiosInstance = axios.create({
    timeout: 3000,
    // headers: {'Authorization': `Bearer ${(localStorage.getItem('topla-jwt') || '')}`}
})

axiosInstance.interceptors.request.use(function(config) {
    const token = localStorage.getItem('topla-jwt') || ''
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  
    return config
  }, function (err) {
    return Promise.reject(err)
  })

export default axiosInstance