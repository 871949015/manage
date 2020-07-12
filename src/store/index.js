import Vue from 'vue'
import Vuex from 'vuex'
import * as util from '../util/util'

Vue.use(Vuex)

const type = {
    SET_USER_INFO: "SET_USER_INFO"
};

export default new Vuex.Store({
    state: {
        user: {
            token: util.getCookie('token') || null,     // 当前用户 token
            username: util.getCookie('username') || null, // 当前用户名称
            userid: util.getCookie('userid') || null,      // 当前用户id 
        }
    },
    getters: {
        token: state => state.token
    },
    actions: {
        userInfo({ commit }, val) {
            commit(type.SET_USER_INFO, val);
        }
    },
    mutations: {
        [type.SET_USER_INFO](state, val) {
            state.user.token = val.token || state.user.token;
            state.user.username = val.username || state.user.username;
            state.user.userid = val.userid || state.user.userid;
        }
    },

    modules: {
    }
})
