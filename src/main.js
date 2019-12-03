import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import filters from './filters/index'
import { Swipe, SwipeItem, Navbar, TabItem } from 'mint-ui'
import api from './api'

import 'mint-ui/lib/style.css'
import './assets/reset.css'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)

Vue.prototype.$api = api;
// import wechat from '@/common/wechat/index'
// import { from } from 'rxjs'
// Vue.use(wechat);

// 注入全局过滤器
Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})
// const wx = Vue.wechat;
// wx.config({
//     appId: '',
//     nonceStr: '',
//     signature: '',
//     timestamp: '',
//     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
// })
Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
