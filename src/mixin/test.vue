<!--  -->
<template>
  <div id="test"></div>
</template>

<script>
import mixin from "./index";
export default {
  mixins: [mixin],             //这里的’mixins‘加 s
  components: {},
  color:'红色',
  data() {
    return {};
  },
  methods: {},
  created() {
      console.log(this.$options.color,this.$options.size)         // 红色 L
      console.log(this.$options.myOption)            // takeFun()
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>