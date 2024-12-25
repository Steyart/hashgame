
// state
let state = {
  userInfo: null,
};
const actions = {
  saveUserInfo({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo);
  },

  changeGameInfo({ commit }, newGameInfo) {
    commit('UPDATE_GAME_INFO', newGameInfo);
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
};

// getters
const getters = {
  userInfo: state => state.userInfo,
};

export default {
  state,
  actions,
  mutations,
  getters
};
