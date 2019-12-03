<!--  -->
<template>
<div id='order'>
    <HeaderTitle :title="'我的订单'"/>
    <PlanList :planType="0" :isHistory='true' :listData='orderList'/>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import PlanList from '../../components/PlanList.vue'
import HeaderTitle from '../../components/HeaderTitle.vue'
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    PlanList,
    HeaderTitle
},
data() {
//这里存放数据
return {
    orderList:[],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getOrderList(){
        this.$api.userOrder({
            clientUserSession:localStorage.getItem('token'),
            page:1,
            size:10
        }).then(res=>{
            console.log(res);
            if(res.flag == 1){
                this.orderList = res.data;
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getOrderList();
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#order{

}
</style>