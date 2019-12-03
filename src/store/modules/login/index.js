import * as type from './mutations_types'
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || '',
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
    },
    mutations: {
        [type.LOGIN](state, data) {
            state.token = data.token;
            state.userInfo = data.userInfo;
            localStorage.setItem('token', data.token)
            localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
        }
    },
    actions: {
        async login(state, data) {
            try {
                // let res = await login({
                //     username: data.username,
                //     password: data.password
                // })
                // 请求登录接口，将返回值传给mutations中的 type.LOGIN 方法
                state.commit(type.LOGIN, data);
                // Toast({
                //     message: '登录成功',
                //     position: 'middle',
                //     duration: 2000
                // });
                // setTimeout(() => {
                //     const redirect = data.$route.query.redirect || '/';
                //     data.$router.replace({
                //         path: redirect
                //     })
                // }, 3000);
            } catch (error) {
            }
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        userInfo(state) {
            console.log('state', state);
            return state.userInfo
        }
    }
}
