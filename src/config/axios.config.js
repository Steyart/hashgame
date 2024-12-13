
/*global $ returnCitySN require ClipboardJS wx err process*/
import axios from 'axios'
import Qs from 'qs'
import router from '../router'
import store from '../store/index'
import { getCookie } from '@/service/util.service'

// $instance基本配置
let $instance = axios.create({
  headers: {
    'language': 'zh',
    'host-url': location.host,
    'token': '',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials: false,
  data: {}
});

// 全局axios配置
$instance.defaults.baseURL = (process.env.NODE_ENV === 'production') ? 'https://api.888bbm.com/api' : '/api';
$instance.defaults.timeout = 30000;
// 额外自定义参数
$instance.retry = 1;
$instance.retryDelay = 1000;
$instance.__retryCount = 0;

$instance.setParams = (posted = false, query = {}) => {
  if ($instance.session_id === undefined && posted) {
  }
  let user = getCookie('user') && JSON.parse(getCookie('user'))
  $instance.defaults.headers.token = user && user.token ? user.token : ''
  $instance.defaults.data = {}
  // 全局需要
  let env = import.meta.env
  // 全局设置session_id
  return $instance.defaults.data;
};

$instance.setParams(true);

// POST传参序列化
$instance.interceptors.request.use((config) => {
  if (typeof config.data === 'string') {
    config.baseURL = '';
    return config;
  }
  let query = {};
  query = router.currentRoute._value.query
  $instance.setParams(false, query);


  Object.assign($instance.defaults.data, config.data);

  Object.assign(config.data, $instance.defaults.data);
  // cookie被清理，分页请求需要登录的跳转到登录页面
  // if (router.currentRoute._value.meta.auth) {
  //   return window.location.replace(`/login?redirect=${router.currentRoute._value.path}`);
  // }
  // if (config.method.toLowerCase() === 'post') {
  //   config.data = Qs.stringify(config.data, { skipNulls: true });
  // }

  return config;
}, (error) => {
  // 错误的传参
  return Promise.reject(error);
});

// 响应拦截器配置
$instance.interceptors.response.use((response) => {
  if (response.data && (response.data.code === 1001)) {
  } else if (response.data.status === 403) {
    return window.location.replace(`/login?redirect=${router.currentRoute._value.path}`);
  } else if (response.data.status === -3 || response.data.status === -2) {

    setTimeout((_) => {
      return window.location.replace(`/login?redirect=${router.currentRoute._value.path}`);
    }, 2000)
  }
  return response;
}, function (error) {
  // console.log(error);
  // console.log(error.name); // ReferenceError
  // console.log(error.message); // lalala is not defined
  // console.log(error.stack); // ReferenceError: lalala is not defined at ...


  if (!error.config || !$instance.retry || $instance.__retryCount >= $instance.retry) return Promise.reject(error);
  $instance.__retryCount++;
  let backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, $instance.retryDelay || 1);
  });
  return backoff.then(function () {
    return $instance(error.config);
  });
  // return Promise.reject(error);
});

export default $instance;
