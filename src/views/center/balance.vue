<!--  -->
<template>
<div id='balance'>
    <HeaderTitle :title="'余额'"/>
    <BillList :type='"money"' :listData='balanceList'/>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import HeaderTitle from "../../components/HeaderTitle";
import BillList from "../../components/BillList";
export default {
//import引入的组件需要注入到对象中才能使用
components: {
    BillList,
    HeaderTitle
},
data() {
//这里存放数据
return {
balanceList:[],
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    getBalanceList(){
        this.$api.balanceListApi({
            clientUserSession:localStorage.getItem('token'),
            page:1,
            size:10
        }).then(res=>{
            console.log(res);
            if(res.flag == 1){
                this.balanceList = res.data;
            }
        })
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getBalanceList();
},
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#balance{

}
</style>