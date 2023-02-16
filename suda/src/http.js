import axios from 'axios'
import Vue from "vue";

const Http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
})

//给http请求加拦截器
Http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    return Promise.reject(err)
})
export default Http