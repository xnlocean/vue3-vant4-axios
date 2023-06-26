import axios from 'axios';
import { showMessage } from "./status";   // 引入状态码文件
import { Toast, Dialog } from "vant";

// 设置接口超时时间
axios.defaults.timeout = 8000;

console.log('loadEnv：',import.meta.env.VITE_APP_BASE_API);

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore

axios.defaults.baseURL =import.meta.env.MODE === 'development'?'/api':import.meta.env.VITE_APP_BASE_API;   
// axios.defaults.baseURL =import.meta.env.VITE_APP_BASE_API


import { getToken, removeToken } from "@/utils/token.js";

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // 配置请求头
        config.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Access-Token': getToken(),
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        const { code=''} = response.data||'';
        if(code!=200){
            Toast(response.data.message||response.data.msg||'');
        }
        return response;
    },
    error => {
        const { response } = error;
        if (response) {
            if (response.status == 401) {
                Toast('登录已过期，请重新登录！');
                androidJS.login();
                return
            };
            // console.log('response.data.message：',response.data);
            if (response.data.message) {
                Toast(response.data.message);
            } else {
                Toast(showMessage(response.status));
            }
            return Promise.reject(response.data);
        } else {
            Toast('网络连接异常,请稍后再试!');
        }
    }
);

// 封装 GET POST 请求并导出
export function request(url = '', params = {}, type = 'POST') {
    //设置 url params type 的默认值
    return new Promise((resolve, reject) => {
        let promise
        if (type.toUpperCase() === 'GET') {
            promise = axios({
                url,
                params
            })
        } else if (type.toUpperCase() === 'POST') {
            promise = axios({
                method: 'POST',
                url,
                data: params
            })
        }
        //处理返回
        promise.then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
