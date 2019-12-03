import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/index'
import useCouponVux from './modules/useCoupon/index'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: { login, useCouponVux },
    state: {
        direction: 'forward',
        tablocal: localStorage.getItem('tablocal') || 1
    },
    mutations: {
        updateDirection(state, direction) {
            state.direction = direction
        },
        updateTablocal(state, data) {
            console.log('store:', state, data);
            state.tablocal = data.tablocal;
            localStorage.setItem('tablocal', data.tablocal);
            const repath = data.path;
            const query = data.query;
            data.$router.replace({
                path: repath,
                query: query
            })
        }
    },
    actions: {}

})
