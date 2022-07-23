import axios from 'axios'
import cookie from 'js-cookie'
//创建axios实例
const service =axios.create({
    baseURL:"http://localhost:8082",
    timeout: 20000 // request timeout
})

//3.拦截器 每次请求中使用拦截器
service.interceptors.request.use(
    config => {
        if(cookie.get("nwu_token")){
            //cookie放到header里面
            config.headers['token']=cookie.get('nwu_token');
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
)

export default service