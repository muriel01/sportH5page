import * as type from './mutations_types'
export default {
    namespaced: true,
    state: {
        couponId: sessionStorage.getItem('couponId') || 0,
        couponName: sessionStorage.getItem('couponName') || ''
    },
    mutations: {
        getcoupon(state, data) {
            state.couponId = data.couponId;
            state.couponName = data.couponName;
            sessionStorage.setItem('couponId', data.couponId);
            sessionStorage.setItem('couponName', data.couponName);
        }
    },
    actions: {
        async chooseCouponFun(state, data) {
            console.log(data);
            // 请求登录接口，将返回值传给mutations中的 type.LOGIN 方法
            state.commit('getcoupon', data);
        }
    },
    getters: {
        couponId(state) {
            return state.couponId
        },
        couponName(state) {
            return state.couponName
        }
    }

}
