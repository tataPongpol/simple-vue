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
        // let res = {
        //     data: [
        //         {
        //             date: '22/07/2021',
        //             list: 'ได้รับเงิน',
        //             income: 500,
        //             expense: 0
        //         },
        //         {
        //             date: '22/07/2021',
        //             list: 'จ่ายค่าขนม',
        //             income: 0,
        //             expense: 20
        //         },
        //         {
        //             date: '23/07/2021',
        //             list: 'ได้รับเงิน',
        //             income: 100,
        //             expense: 0
        //         },
        //         {
        //             date: '23/07/2021',
        //             list: 'จ่ายค่าอุปกรณ์การเรียน',
        //             income: 0,
        //             expense: 300
        //         },
        //     ]
        // }
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
