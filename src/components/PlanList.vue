<!--  -->
<template>
  <div id="PlanList">
    <div v-for="(item,index) in listData" :key='index' class="exp-list">
      <div class="exp-first" v-if="planType">
        <router-link tag="div" :to="{path:'/expertsInfo',query:{id:item.userID}}" class="exp-user">
          <img :src="item.avatar" alt />
          <p class="u-name">{{item.username}}</p>
          <p class="tags">
            <span class="tag">{{item.record}}</span>
          </p>
        </router-link>
        <div class="exp-score">
          <p class="score-show">
            <span>{{item.hitRate}}</span>
            <img src="../assets/images/percent.svg" alt />
          </p>
          <span class="score-tip">命中率</span>
        </div>
      </div>
      <router-link tag="p" :to="{path:'/planInfo',query:{id:item.schemeID}}" class="game-new">{{item.sDescribe}}</router-link>
      <div class="game-infos">
        <div class="game-info">
          <span class="tag">{{item.lotteryID == 10059 ?'竞足':'竞篮'}}</span>
          <p>{{item.matchTime}} {{item.leagueName}}</p>
          <p class="game-team">{{item.hostName}} vs {{item.guestName}}</p>
        </div>
        <img src="../assets/images/left.svg" alt />
      </div>
      <div class="exp-time">
        <p>
          <span>{{item.orderTime | releaseTime}}</span>
          <span v-if="isHistory" class="look">查看(复盘)</span>
        </p>
        <img v-if="isHistory" class="plan-res" src="../assets/images/plan-res-ok.svg" alt="">
        <p v-else>
          <img class="gold" src="../assets/images/gold.svg" alt />
          <span>{{item.money}}金豆</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  props: {
    planType: {
      type: Number,
      default: 1
    },
    isHistory: {
      type: Boolean,
      default: false
    },
    listData:{
      type:Array,
      default:function(){
        return []
      }
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
#PlanList {
  .exp-list {
    padding: 30px 32px 26px 32px;
    background: #fff;
    margin-top: 20px;
    .exp-first {
      @include flexSty(row, space-between, center);
      margin-bottom: 32px;
      .exp-user {
        @include flexSty(row, flex-start, center);
        img {
          @include userHeader(76px, 76px);
        }
        p {
          @include line-height(28px, 28px);
        }
        .u-name {
          font-size: 32px;
          font-weight: bold;
          margin: 0 4px 0 16px;
        }
        .tags {
          @include flexSty(row, flex-start, center);
          span {
            margin-left: 12px;
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
    .game-new {
      font-size: 30px;
      line-height: 42px;
      text-align: left;
      margin: 0px 0 24px 0;
    }
    .game-infos {
      @include flexSty(row, space-between, center);
      background: #f5f7fa;
      border-radius: 8px;
      height: 62px;
      padding: 0 20px;
      .game-info {
        @include flexSty(row, space-between, center);
        p {
          font-size: 24px;
          color: #666;
          line-height: 34px;
          margin-left: 18px;
        }
        .game-team {
          border-left: 1px solid #d6d6d6;
          line-height: 36px;
          padding-left: 20px;
        }
      }
    }
    .exp-time {
      @include flexSty(row, space-between, center);
      margin-top: 24px;
      span {
        font-size: 24px;
        color: #999;
        line-height: 34px;
      }
      .look{
        color: #4B86FE;
        margin-left: 40px;
      }
      p {
        @include flexSty(row, center, center);
        line-height: 34px;
        height: 34px;
      }
      .gold {
        width: 26px;
        height: 26px;
      }
      .plan-res{
        width: 42px;
        height: 42px;
      }
    }
  }
}
</style>