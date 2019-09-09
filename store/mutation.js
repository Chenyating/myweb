import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const userInfo = {
    //必须执行同步方法，可以直接修改state的值；
    isLogin(state) {
        var userInfo = sessionStorage.getItem('userInfo');
        if (userInfo) {
            state.ifLogin = true;
        } else {
            state.ifLogin = false;
        }
    }
}
