<!--  -->
<template>
  <div id="ExpertsList">
    <ul>
      <router-link
        tag="li"
        v-for="(item,index) in listData"
        :key="index"
        :to="{path:'/expertsInfo',query:{id:item.userID}}"
      >
        <div class="exp-intr">
          <img class="exp-img" :src="item.avatar" alt />
          <div class="exp-results">
            <div class="exp-info">
              <p class="exp-name">{{item.username}}</p>
              <span class="tag">{{item.winStreak}}</span>
            </div>
            <p class="focus" v-if="onFocus || item.isConcern == 1">已关注</p>
            <p class="to-focus" v-else>关注</p>
          </div>
        </div>
        <div class="exp-score">
          <p class="score-show">
            <span>{{item.hitRate}}</span>
            <img src="../assets/images/percent.svg" alt />
          </p>
          <span class="score-tip">命中率</span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    listData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    onFocus: {
      type: Boolean,
      default: false
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
#ExpertsList {
  ul {
    li {
      @include flexSty(row, space-between, center);
      background: rgba(255, 255, 255, 1);
      height: 100px;
      padding: 30px 32px 26px 32px;
      margin-top: 20px;
      .exp-intr {
        @include flexSty(row, center, center);
        height: 100%;
        .exp-img {
          @include userHeader(100px, 100px);
          margin-right: 20px;
        }
        .exp-results {
          height: 100%;
          @include flexSty(column, space-between, flex-start);
          .exp-info {
            @include flexSty(row, center, center);
            .exp-name {
              font-size: 32px;
              font-weight: bold;
              margin-right: 4px;
            }
            span {
              margin-left: 12px;
            }
          }
          .focus {
            font-size: 22px;
            color: #bbb;
            padding: 8px 12px;
            border-radius: 20px;
            border: 2px solid rgba(187, 187, 187, 1);
          }
          .to-focus {
            font-size: 22px;
            width: 92px;
            height: 40px;
            line-height: 40px;
            background: #FF161B;
            border-radius: 20px;
            color: #fff;
          }
        }
      }

      .exp-score {
        color: #ff3b30;
        @include flexSty(column, flex-start, center);
        .score-show {
          @include line-height(60px, 60px);
          font-size: 50px;
          font-weight: bold;
          position: relative;
          img {
            position: absolute;
            width: 16px;
            height: 22px;
          }
        }
        .score-tip {
          font-size: 20px;
        }
      }
    }
  }
}
</style>