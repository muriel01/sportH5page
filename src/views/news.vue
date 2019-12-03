<!--  -->
<template>
  <div id="news">
    <p class="title">资讯</p>
    <ul>
      <router-link tag="li" v-for="(item,index) in newsList" :key="index" :to="{path:'/newsInfo',query:{id:item.id}}">
        <div class="news-info">
          <p class="news-name">{{item.title}}</p>
          <div class="news-info-more">
            <p>{{item.author}}</p>
            <p>{{item.updateTime}}</p>
          </div>
        </div>
        <img class="news-img" :src="item.smallImg" alt />
      </router-link>
    </ul>
    <Tabbar class="tabbar" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Tabbar from "@/components/Tabbar.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Tabbar
  },
  data() {
    //这里存放数据
    return {
      newsList:[],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getNewsList() {
      this.$api
        .newsListApi({
          page: 1,
          size: 10
        })
        .then(res => {
          console.log(res);
          if(res.flag == 1){
            this.newsList = res.data;
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getNewsList();
  }
};
</script>
<style lang='scss' scoped>
#news {
  .title {
    font-size: 36px;
    font-weight: bold;
    color: #fff;
    line-height: 110px;
    height: 92px;
    background: linear-gradient(
      90deg,
      rgba(248, 71, 47, 1) 0%,
      rgba(232, 48, 48, 1) 100%
    );
  }
  ul {
    background: #fff;
    @include flexSty(column, center, center);
    padding: 0px 30px;
    li {
      width: 100%;
      margin: 32px 0px;
      @include flexSty(row, space-between, initial);
      .news-info {
        width: calc(100% - 264px);
        @include flexSty(column, space-between, flex-start);
        .news-name {
          font-size: 32px;
          text-align: left;
          line-height:44px;
        }
        .news-info-more {
          width: 100%;
          margin-top: 30px;
          @include flexSty(row, space-between, center);
          p {
            font-size: 22px;
            color: #999;
            line-height: 32px;
          }
        }
      }
      .news-img {
        width: 230px;
        height: 150px;
        border-radius: 10px;
        margin-left: 34px;
      }
    }
  }
}
</style>