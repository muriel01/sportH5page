<!--  -->
<template>
  <div id="Tabbar">
    <ul>
      <li
        v-for="(item,index) in tabbar"
        @click.stop="choosePage(item.id,item.path)"
        :key="index"
      >
        <img :src="onPage == item.id?item.img2:item.img" alt />
        <p :style="{color:onPage==item.id?'#e53017':'#333'}">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapMutations, mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // onPage: 1,
      tabbar: [
        {
          id: 1,
          img: require("../assets/images/home.svg"),
          img2: require("../assets/images/home-on.svg"),
          path: "/",
          name: "首页"
        },
        {
          id: 2,
          img: require("../assets/images/experts.svg"),
          img2: require("../assets/images/experts-on.svg"),
          path: "/experts",
          name: "专家"
        },
        {
          id: 3,
          img: require("../assets/images/event.svg"),
          img2: require("../assets/images/event-on.svg"),
          path: "/event",
          name: "赛事"
        },
        {
          id: 4,
          img: require("../assets/images/news.svg"),
          img2: require("../assets/images/news-on.svg"),
          path: "/news",
          name: "资讯"
        },
        {
          id: 5,
          img: require("../assets/images/center.svg"),
          img2: require("../assets/images/center-on.svg"),
          path: "/user",
          name: "我的"
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {
    // onPage() {},
    ...mapState({
      onPage: "tablocal"
    })
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations({
      chooseTab: "updateTablocal"
    }),
    choosePage(id,path){
      this.chooseTab({
        tablocal:id,
        path:path,
        $router:this.$router
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss' scoped>
#Tabbar {
  ul {
    @include flexSty(row, center, center);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.25);
    li {
      @include flexSty(column, space-between, center);
      width: 20%;
      height: 82px;
      padding: 8px 0px;
      img {
        width: 48px;
        height: 48px;
      }
      p {
        font-size: 20px;
        line-height: 28px;
        margin-top: 4px;
      }
    }
  }
}
</style>
