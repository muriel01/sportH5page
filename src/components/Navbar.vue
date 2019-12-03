<!--  -->
<template>
  <div id="Navbar">
    <div v-if="navType == 1" class="nav1" :style="{justifyContent:styObj.justifyContent}">
      <div
        :style="{width:styObj.width}"
        v-for="(item,index) in tabArr"
        @click="chooseTab(item.id)"
        :class="value == item.id?'checked':''"
        :key="index"
      >{{item.name}}</div>
    </div>
    <div v-if="navType == 2" class="nav2">
      <div
        v-for="(item,index) in tabArr"
        @click="chooseTab(item.id)"
        :class="value == item.id?'checked':''"
        :key="index"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  data() {
    //这里存放数据
    return {};
  },
  props: {
    tabArr: {
      type: Array
    },
    navType: {
      type: Number,
      default: 1
    },
    styObj:{
      type: Object,
      default: function(){
        return{
          width:'30%',
          justifyContent:'center'
        }
      }
    },
    value: {
      type: Number,
      default: 1
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    chooseTab(id) {
      this.$emit("input", id);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss' scoped>
#Navbar {
  .nav1 {
    @include flexSty(row, center, center);
    @include line-height(80px);
    width: 100%;
    background: #fff;
    font-size: 28px;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
    .checked {
      position: relative;
      color: #ff3b30;
      font-weight: bold;
      &:after {
        position: absolute;
        width: 40px;
        height: 6px;
        background: #f8472f;
        content: "";
        bottom: -26px;
        left: 50%;
        margin-left: -20px;
        border-radius: 2px;
      }
    }
  }
  .nav2{
    @include flexSty(row, space-around, center);
    @include line-height(92px);
    width: 100%;
    background:linear-gradient(90deg,rgba(248,71,47,1) 0%,rgba(232,48,48,1) 100%);
    font-size:32px;
    color: #fff;
    .checked{
      font-weight: bold;
    }
  }
}
</style>