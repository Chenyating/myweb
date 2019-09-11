// 封装一下axios方法；
import axios from 'axios'

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
axios.defaults.baseURL = '/api'//这是请求的域名地址
axios.defaults.headers = { 'Cache-Control': 'no-cache' }//去掉get缓存
// axios.defaults.timeout = 6000;//请求时间的设置。超过6秒就算超时

// get和post传params的区别，get要{params},否则失败；

function GET(url, params) {
    return new Promise((scuessful, fail) => {
        axios.get(url, { params })
            .then(function (response) {
                scuessful(response);
            })
            .catch(function (error) {
                fail(error);
            });
    });
}
function POST(url, params) {
    return new Promise((scuessful, fail) => {
        var userInfo = sessionStorage.getItem('userInfo');
        if(userInfo){
            axios.defaults.headers.token = JSON.parse(userInfo).token;
            axios.defaults.headers.account = JSON.parse(userInfo).account;
        }
        axios.post(url, params)
            .then(function (response) {
                scuessful(response);
            })
            .catch(function (error) {
                fail(error);
            });
    });
}
function UPLOAD(url, files) {
    return new Promise((scuessful, fail) => {
        var userInfo = sessionStorage.getItem('userInfo');
        if(userInfo){
            axios.defaults.headers.token = JSON.parse(userInfo).token;
            axios.defaults.headers.account = JSON.parse(userInfo).account;
        }
        let formData = new FormData();
        formData.append("file", files)
        axios.post(url, formData, { 'Content-Type': 'multipart/form-data' })
            .then(function (response) {
                scuessful(response);
            })
            .catch(function (error) {
                fail(error);
            });
    });
}

// export default 导出的是一个对象集合；
export default {
    GET, POST, UPLOAD
}

// 引用方法的方式：
// 这是文件是使用export default{方法1，方法2}，以导出对象的方式；使用的时候要：对象.方法1()
// import HTTP from '~/assets/server/http.js' 使用的时候就，HTTP.GET();

// export 导出的是一个方法；
// export function funcName(){}

// 这是文件已export function funcName(){}的方式导出方法，引用的时候要{方法1，方法2}的方式。用的时候直接：方法1();
// import {GET,POST} from '~/assets/server/http.js' 使用的时候，就GET();