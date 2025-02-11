
import axios from 'axios';
// state
let state = {
  userInfo: null,
  appColor: '',
};
const actions = {
  saveUserInfo({ commit, dispatch }, userInfo) {
    commit('SET_USER_INFO', userInfo);
    dispatch('setHttpHeaders', userInfo.token);
  },

  changeGameInfo({ commit }, newGameInfo) {
    commit('UPDATE_GAME_INFO', newGameInfo);
  },
  // 设置HTTP请求头
  setHttpHeaders(_, payload) {
    if (payload) {
      axios.defaults.headers['Authorization'] = `Bearer ${payload}`;;
    }
  },
};

// mutations
const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },

  UPDATE_GAME_INFO(state, newGameInfo) {
    state.userInfo.gameType = newGameInfo.gameType;
    state.userInfo.gameName = newGameInfo.name;
  },
  setAppColor: (state, payload) => {
    state.appColor = payload
  },
};

// getters
const getters = {
  userInfo: state => state.userInfo,
  appColor: state => state.appColor,
};

export default {
  state,
  actions,
  mutations,
  getters
};
