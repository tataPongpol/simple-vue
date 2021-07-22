import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

let api_data = "/dataTransaction.json"

Vue.use(Vuex)
Vue.prototype.moment = moment

export default new Vuex.Store({
  state: {
    data: []
  },
  getters: {
    transactions: (state) => state.data
  },
  mutations: {
    fetch (state, { res }) {
        state.data = res.data
    },
    add (state, { payload }) {
        state.data.push(payload)
    }
  },
  actions: {
    async fetchTransaction({ commit }) {
        let res = await axios.get(api_data)
        commit('fetch', { res })
    },
    addTransaction({ commit }, payload) {
        commit('add', { payload })
    }
  },
  modules: {
  }
})
