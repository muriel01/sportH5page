<!--  -->
<template>
  <div id="BillList">
    <ul>
      <li v-for="(item,index) in listData" :key="index">
        <div class="bill-intr">
          <img :src="require('../assets/images/'+ ( type == 'money' ? 'balance.svg': 'coupon.svg') )" alt />
          <div class="bill-info">
            <p class="bill-n">{{item.type}}</p>
            <p class="bill-t">{{item.datetime}}</p>
          </div>
        </div>
        <div class="bill-info2">
          <p class="bill-n">{{type=='money'? ( (item.in_out == 1 ? '-' : '+')+item.money) : item.detail}}</p>
          <p class="bill-t" v-if="type=='money'">余额{{item.balance}}金豆</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props:{
    listData:{
      type:Array,
      default:function(){
        return []
      }
    },
    type:{
      type:String,
      default:'money',
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#BillList {
  ul {
    background: #fff;
    margin-top: 20px;
    li {
      padding: 20px 32px;
      height: 96px;
      @include flexSty(row, space-between, center);
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.06);
      .bill-intr {
        height: 100%;
        img {
          @include userHeader(80px, 80px);
          margin-right: 20px;
        }
        @include flexSty(row, center, center);
        .bill-info {
          height: 100%;
          @include flexSty(column, space-between, flex-start);
        }
      }
      .bill-info2 {
        height: 100%;
        @include flexSty(column, space-between, flex-end);
      }
      .bill-n {
        font-size: 30px;
        line-height: 42px;
      }
      .bill-t {
        font-size: 24px;
        color: #999;
        line-height: 34px;
      }
    }
  }
}
</style>