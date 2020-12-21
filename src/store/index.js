import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getItem, setItem } from '../utils/stroage'

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    //从本次存储中，当前登录用户的登录状态（token等数据）
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      //为了防止页面刷新，数据丢失，我们还需要把数据放到本地存储，这里仅仅是为了持久化数据
      setItem(USER_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
