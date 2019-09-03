import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const userInfo= {
    // 可以执行异步，一个方法里可以执行多个mutation，不能直接修改state的值
    isLogin(context){
        //这里的context和我们使用的$store拥有相同的对象和方
        context.commit('isLogin');
        //你还可以在这里触发其他的mutations方法
    }
}