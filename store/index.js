import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import * as state from './state'
import * as action from './action'
import * as mutation from './mutation'
const store = () => new Vuex.Store({
    state:state.userInfo,
    actions:action.userInfo,
    mutations:mutation.userInfo
})

export default store