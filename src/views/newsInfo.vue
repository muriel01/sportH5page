<!--  -->
<template>
  <div id="newsInfo">
    <HeaderTitle :title="'资讯'" />
    <div>
      <p class="news-title">{{titile}}</p>
      <p class="news-time">{{author}} {{updateTime}}</p>
      <div
        class="content"
      >{{content}}</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTitle from "../components/HeaderTitle.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTitle
  },
  data() {
    //这里存放数据
    return {
      titile:'',
      author:'',
      content:'',
      updateTime:'',
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getNewsInfo() {
      this.$api.newsDedailApi({
        id:this.$route.query.id
      }).then(res=>{
        console.log(res);
        if(res.flag == 1){
          this.titile = res.titile;
          this.author = res.author;
          this.content = res.content;
          this.updateTime = res.updateTime;
        }
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getNewsInfo();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#newsInfo {
  background: #fff;
  text-align: left;
  .news-title {
    font-size: 44px;
    font-weight: bold;
    line-height: 60px;
    margin: 40px 32px 28px 32px;
  }
  .news-time {
    font-size: 24px;
    color: #999;
    line-height: 34px;
    margin-left: 32px;
  }
  .content {
    font-size: 34px;
    line-height: 54px;
    margin: 48px 32px 0px 32px;
  }
}
</style>