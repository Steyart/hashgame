import axios from '@/config/axios.config'
import {getCookie, saveCookie, removeCookie} from '@/service/util.service'
import {
  LOGIN_OUT,
  LOGIN_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_HTTP_HEADERS,
  SET_HOST_URL,
  UPDATE_DIRECTION,
  UPDATE_FACTORYLIST,
  UPDATE_BANNERLIST,
  UPDATE_INDEXNAV,
  UPDATE_LOADING,
  UPDATE_HIDECUSTOM,
  UPDATE_IS_ALL,
  CHANGE_SHOWLEFT,
  SET_LANGUAGE_SHOW,
  SET_LANGUAGE_LISTS,
  SET_VIP_LIST,
} from '../mutation-types'

// state
let state = {
  'user': getCookie('user') && JSON.parse(getCookie('user')) || null,
  'language': 'zh',
  'languageShow': false,
  'languageLists': [],
  'isLogged': localStorage.getItem("isLogged") == 1 || false,
  'indexNav': [],
  "gameData": null,
  "isLoading": false,
  "showLeft": false,
  "isHideCustom": false,
  "is_all": false,
  "direction": "",
  "factoryList": [],
  "swiperTimerList": {
    "betRaceListTime": null,
    "betSumListTime": null,
    "betListTime": null,
    "orderListTime": null,
    "dateTimeListTime": null,
  },
  "vipInfo": [],
};
// account_type 1商务 2财务 3经理 4渠道
// actions
const actions = {
  getUserInfo: ({commit, dispatch}) => {
    let user = (getCookie('user') && JSON.parse(getCookie('user')));
    if (user) {
      commit('GET_USER_SUCCESS', user);
      dispatch('SET_HTTP_HEADERS', user.token);
    } else {
      commit('GET_USER_FAILURE');
      dispatch('SET_HTTP_HEADERS');
    }
  },
  // 设置HTTP请求头
  [SET_HTTP_HEADERS]: (_, payload) => {
    if (payload) {
      axios.defaults.headers['token'] = payload;
    }
  },
  // 设置HTTP请求头
  [SET_HOST_URL]: (_, payload) => {
    if (payload) {
      axios.defaults.headers['host-url'] = payload;
    }
  },
  loginSuccess: ({commit}, payload) => {
    commit(LOGIN_SUCCESS, payload);
  },
  updateFactoryList: ({commit}, payload) => {
    commit(UPDATE_FACTORYLIST, payload);
  },
  updateBannerList: ({commit}, payload) => {
    commit(UPDATE_BANNERLIST, payload);
  },
  updateBannerList: ({commit}, payload) => {
    commit(UPDATE_BANNERLIST, payload);
  },
  updateIndexNav: ({commit}, payload) => {
    commit(UPDATE_INDEXNAV, payload);
  },
  changeShowLeft: ({commit}, payload) => {
    commit(CHANGE_SHOWLEFT, payload);
  },
  loginOut: ({commit}, payload) => {
    commit(LOGIN_OUT, payload);
  },
  changeLanguageShow: ({commit}, payload) => {
    commit(SET_LANGUAGE_SHOW, payload);
  },
  setLanguageList: ({commit}, payload) => {
    commit(SET_LANGUAGE_LISTS, payload);
  },
  setVipList: ({commit}, payload) => {
    commit(SET_VIP_LIST, payload);
  },
};

// mutations
const mutations = {
  [UPDATE_DIRECTION](state, payload) {
    state.direction = payload.direction
  },
  // 登陆成功
  [LOGIN_SUCCESS](state, payload) {
    state.user = payload;
    saveCookie("user", JSON.stringify(payload));
  },
  // 用户信息获取成功
  [GET_USER_SUCCESS](state, payload) {
    state.user = payload;
  },
  // 用户信息获取失败
  [GET_USER_FAILURE](state) {
    state.user = null;
    removeCookie('user');
  },
  // 退出登录
  [LOGIN_OUT](state) {
    state.isLogged = false
    localStorage.removeItem('isLogged')
    localStorage.removeItem('router-name')
    localStorage.removeItem('languageValue')
    removeCookie('user');
  },
  [UPDATE_FACTORYLIST](state, payload){
    state.factoryList = payload
  },
  [UPDATE_BANNERLIST](state, payload){
    state.bannerList = payload
  },
  [UPDATE_INDEXNAV](state, payload){
    state.indexNav = payload
  },
  [UPDATE_LOADING](state, payload){
    state.isLoading = payload
  },
  [UPDATE_HIDECUSTOM](state, payload){
    state.isHideCustom = payload
  },
  [CHANGE_SHOWLEFT](state, payload){
    state.showLeft = payload
  },
  [UPDATE_IS_ALL](state, payload){
    state.is_all = payload
  },
  setSwiperTimeList(state, payload){
    state.swiperTimerList[`${payload.name}ListTime`] = payload.time
  },
  setLoggedStatus(state, payload){
    localStorage.setItem("isLogged", 1)
    state.isLogged = payload
  },
  setLanguage(state, payload){
    localStorage.setItem('languageValue', payload)
    axios.defaults.headers['language'] = payload;
    state.language = payload
  },
  [SET_LANGUAGE_SHOW](state, payload){
    state.languageShow = payload
  },
  [SET_LANGUAGE_LISTS](state, payload){
    state.languageLists = payload || []
  },
  [SET_VIP_LIST](state, payload){
    state.vipInfo = payload || []
  },
};

// getters
const getters = {
  user: (state) => {
    return state.user
  },
  factoryList: (state)=>{
    return state.factoryList
  },
  bannerList: (state)=>{
    return state.bannerList
  },
  indexNav: (state)=>{
    return state.indexNav
  },
  showLeft: (state)=>{
    return state.showLeft
  },
  isLoading: (state)=>{
    return state.isLoading
  },
  isHideCustom: (state)=>{
    return state.isHideCustom
  },
  is_all: (state)=>{
    return state.is_all
  },
  swiperTimerList: (state)=>{
    return state.swiperTimerList
  },
  isLogged: (state)=>{
    return state.isLogged
  },
  language: (state)=>{
    return state.language
  },
  languageShow: (state)=>{
    return state.languageShow
  },
  languageLists: (state)=>{
    return state.languageLists
  },
  vipInfo: (state)=>{
    return state.vipInfo
  },
};

export default {
  state,
  actions,
  mutations,
  getters
};
