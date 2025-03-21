
/*global $ returnCitySN require ClipboardJS wx err process*/
import axios from 'axios'
import store from '../store/index'
import router from '../router'
import { getCookie } from '@/service/util.service'
import { showToast } from "vant"
import { generateRandomString } from '@/service/util.helper'
let $instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: false,
  baseURL:  _APP_HISTORY_ == 2 ? _APP_POSTURL_ : (process.env.NODE_ENV == 'development' ? '/api' : _APP_POSTURL_),
  // baseURL: (process.env.NODE_ENV === 'production') ? 'https://hash-api.hashgo888.com/api' : '/api',
  timeout: 30000,
  retry: 1,
  retryDelay: 1000,
  __retryCount: 0
});

// 设置全局参数方法
$instance.setParams = (posted = false, query = {}) => {
  const token = getCookie('token') || store.state.auth.userInfo?.token;
  if (token) {
    $instance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete $instance.defaults.headers.Authorization; // 确保没有无效的Authorization头
  }

  return $instance.defaults.data;
};

// 初始化设置
$instance.setParams(true);

// POST传参序列化
$instance.interceptors.request.use((config) => {
  if (typeof config.data === 'string') {
    config.baseURL = '';
    return config;
  }

  const token = getCookie('token') || store.state.auth.userInfo?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // 确保没有无效的Authorization头
  }
  // 设置全局参数
  $instance.setParams(false, {});
  
  if(config.data && config.data.isSign){
    config.headers.key = 'yq3igbvdknbvohnw'
    config.headers.sign = generateRandomString(64)
    config.headers.timestamp = new Date().getTime()
    config.headers['Content-Type'] = 'application/json'
    config.data.isSign = undefined
  }else if(config.data && config.data.method == 'eth_blockNumber'){
    config.headers['Content-Type'] = 'application/json'
    config.redirect = 'follow'
  }

  // 如果是POST请求并且不是简单的请求，则可能触发预检请求
  if (config.method.toLowerCase() === 'post') {
    config.headers['Content-Type'] = 'application/json'; // 或者 application/x-www-form-urlencoded
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器配置
$instance.interceptors.response.use((response) => {
  if (response.data && response.data.code === 1001) {
    // 处理业务逻辑错误
  } else if (response.status === 403 || response.data.status === 403) {
  } else if ([-3, -2].includes(response.data.status)) {
    setTimeout(() => {
    }, 2000);
  }
  return response;
}, function (error) {
  console.error(error);
  if (error.response && error.response.status === 401) {
    showToast({
      type: "fail",
      message: "未登录",
      className: "fail-toast-box",
    });
  }
  if(error.response && error.response.data && error.response.data.code){
    showToast({
      type: "fail",
      message: error.response.data.message,
      className: "fail-toast-box",
    });
  }
  return Promise.reject(error);
});

export default $instance;
