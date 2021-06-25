/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数的返回值是paomise对象
 */

import axios from 'axios';//封装axios库，所以要引入

export default function ajax(requestUrl,requestData={},requestMethod='GET'){
    //参数：定义默认参数为空对象（当不传requestData时）
    //参数：定义默认请求方式为GET（当不传requestMethod时）
    if(requestMethod==='GET'){
        return axios.get(requestUrl,{params:requestData});
    }else{
        return axios.post(requestUrl,requestData);
    }

}