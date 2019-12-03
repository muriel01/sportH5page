import { get, post } from '@/axios/http.js'

const api = {
    getIndex (params) {
        return get('/index/index.htm', params)
    },
    expertListApi (params) {
        return get('/expert/list.htm', params)
    },
    expertDetailApi (params) {
        return get('/expert/expert_detail.htm', params)
    },
    myExpertList (params) {
        return get('/expert/my_expert_list.htm', params)
    },
    myExpertOrderList (params) {
        return get('/expert/my_expert_order_list.htm', params)
    },
    planInfoApi (params) {
        return get('/expert/order_detail.htm', params)
    },
    newsListApi (params) {
        return get('/index/article_list.htm', params)
    },
    newsDedailApi (params) {
        return get('/index/article_detail.htm', params)
    },
    userInfoApi (params) {
        return get('/user/index.htm', params)
    },
    userOrder (params) {
        return get('/user/order.htm', params)
    },
    couponListApi (params) {
        return get('/user/coupon_list.htm', params)
    },
    couponDetailList (params) {
        return get('/user/coupon_detail_list.htm', params)
    },
    balanceListApi (params) {
        return get('/user/balance_list.htm', params)
    },
    getCodeApi (params) {
        return get('/user/get_code.htm', params)
    },
    isbindMobile (params) {
        return get('/user/isbind_mobile.htm', params)
    },
    login(params) {
        return get('/user/login.htm', params)
    }
}

export default api;
