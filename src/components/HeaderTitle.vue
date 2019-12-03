<!--  -->
<template>
  <div id="HeaderTitle">
    <img @click="rtn" class="rtn" src="../assets/images/right.svg" alt />
    <p class="page-title">{{title}}</p>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},

  props:{
      title:{
          type:String,
          default:''
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
  methods: {
      rtn(){
          this.$router.go(-1);
      }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#HeaderTitle {
  @include flexSty(row, center, center);
  height: 98px;
  background: linear-gradient(
    90deg,
    rgba(248, 71, 47, 1) 0%,
    rgba(232, 48, 48, 1) 100%
  );
position: relative;
  .page-title {
    font-size: 36px;
    font-weight: bold;
    color: #fff;
    line-height: 50px;
  }
  .rtn {
      position: absolute;
      left: 32px;
  }
}
</style>