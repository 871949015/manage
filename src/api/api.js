import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router';
import * as util from '../util/util'

axios.defaults.baseURL = '/api'; //开发环境请求地址

// 创建axios实例

axios.interceptors.request.use(config => {
    let token = util.getCookie('token'); // 获取商户token
    token && util.setCookie('token', token, 28800);
    config.headers.common['Authorization'] = token;
    return config;
}, (error) => {
    console.log(error)
    return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(response => {
    if (status === false) {
        Message.error('数据错误');
    }
    if (response.status === 200) {
        switch (response.data.status) {
            case 40001:
                Message.error('数据不存在');
                break;
            case 40003:
                Message.error('用户名或密码不正确');
                break;
            case 40005:
                Message.error('未登录，请登录');
                break;
            case 4006:
                Message.error('已存在该账户');
                break;
            case 5:
                Message.error('登录超时，请重新登录');
                break;
            default:
                let _message = response.data.msg;
                let _error = typeof _message !== 'object' ? _message.toString() : _message;
                break;
        }

        return response;
    }
}, (error) => {
    Message.error('服务器出了点小问题');
    return Promise.reject(error);
});


export const get_key = (parm) => axios.get('/user/get_key', parm);
export const login = (parm) => axios.post('/user/manage_login', parm);
export const token_test = (parm) => axios.post('/user/token_test', parm);
export const get_activity_list = (parm) => axios.post('/activity/activity_list', parm);
export const activity_add = (parm) => axios.post('/activity/activity_add', parm);
export const activity_get = (parm) => axios.get('/activity/activity_detail', parm);
export const activity_update = (parm) => axios.post('/activity/activity_update', parm);

