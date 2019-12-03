<!--  -->
<template>
  <div id="planInfo">
    <HeaderTitle :title="'方案详情'"/>
    <div class="plan-top">
      <p class="sell-info">
        <span class="sell-time">方案售卖倒计时 05:56:23</span>
        <span class="sell-stu">进行中</span>
      </p>
      <p class="plan-title">{{sDescribe}}</p>
      <div class="plan-info">
        <p>3小时前发布</p>
        <p>{{seeNums}}人查看</p>
      </div>
      <div class="experts">
        <div class="experts-info">
          <img :src="avatar" alt />
          <div class="exp-info">
            <p class="exp-name">{{username}}</p>
            <span class="tag">{{record}}</span>
            <span class="tag">{{winStreak}}</span>
          </div>
        </div>
        <p class="focus">{{isConcern == 1?'已关注':'关注'}}</p>
      </div>
    </div>
    <GameList v-if="gameList.length>0" :listData='gameList' :type='lotteryID' :status='status'/>
    <div class="buy-plan">
      <p class="tip">
        <!-- <img src="" alt=""> -->
        <span>观点仅供参考，投注需谨慎，如需购彩请前往彩票店</span>
      </p>
      <div class="coupons" v-if="couponCount && (status != 501 || status != 601)">
        <p class="font15">优惠券</p>
        <router-link tag="p" :to='{path:"/coupons",query:{type:2}}' class="get-coupons">
          <span>{{couponName?couponName:(couponCount +'张优惠券可用')}}</span>
          <img src="../assets/images/left.svg" alt="选择优惠券" />
        </router-link>
      </div>
      <div class="pay-plan" v-if="status != 501 && status != 601">
        <p class="font15">需支付：{{money}} 金豆</p>
        <p class="pay font15">立即支付</p>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTitle from '../components/HeaderTitle.vue'
import GameList from '../components/gameList.vue'
import {
    mapState,mapActions
} from 'vuex';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTitle,
    GameList
  },
  data() {
    //这里存放数据
    return {
      sDescribe:'',
      status:'',
      lotteryID:10059,            //彩种ID 10058篮球 10059足球
      orderTime:'',             //发布时间
      seeNums:'',
      username:'',
      avatar:'',
      record:'',
      winStreak:'',
      isConcern:'',
      money:'',
      lastProcess:'',
      gameList:[],
      couponCount:0,
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("useCouponVux", ["couponId","couponName"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getPlanInfo(){
      this.$api.planInfoApi({
        clientUserSession:localStorage.getItem('token'),
        schemeID:this.$route.query.id
      }).then(res=>{
        console.log(res);
        if(res.flag == 1){
          this.sDescribe = res.sDescribe;
          this.status = res.status;
          this.lotteryID = res.lotteryID;
          this.orderTime = res.orderTime;
          this.seeNums = res.seeNums;
          this.username = res.username;
          this.avatar = res.avatar;
          this.record = res.record;
          this.winStreak = res.winStreak;
          this.isConcern = res.isConcern;
          this.money = res.money;
          this.lastProcess = res.lastProcess;
          if(res.lotteryID == 10059){
            this.gameList = res.footballMatchList
          }else{
            this.gameList = res.basketballMatchList
          }
        }

      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.couponCount = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).couponCount:0;
    this.getPlanInfo();
  },
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#planInfo {
  .plan-top {
    background: #fff;
    // @include flexSty(column, space-between, center);
    padding-top: 32px;
    position: relative;
    .sell-info {
      @include flexSty(row, space-between, center);
      //   position: absolute;
      //   top: 32px;
      .sell-time {
        font-size: 24px;
        color: #4b99fe;
        line-height: 34px;

        width: 336px;
        @include line-height(42px, 42px);
        background: rgba(75, 153, 254, 0.09);
        border-radius: 0px 26px 26px 0px;
      }
      .sell-stu {
        font-size: 24px;
        color: #ff9530;
        width: 112px;
        @include line-height(42px, 42px);
        background: rgba(255, 75, 51, 0.07);
        border-radius: 22px;
        margin-right: 32px;
      }
    }
    .plan-title {
      font-size: 40px;
      font-weight: bold;
      line-height: 56px;
      text-align: left;
      margin: 32px 32px 32px 24px;
    }
    .plan-info {
      @include flexSty(row, space-between, center);
      font-size: 24px;
      color: #999;
      line-height: 34px;
      padding: 0px 32px 32px;
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
    }
    .experts {
      margin: 0px 32px;
      height: 140px;
      @include flexSty(row, space-between, center);
      img {
        @include userHeader(76px, 76px);
      }
      .experts-info {
        @include flexSty(row, space-between, center);
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
      }
      .focus {
        font-size: 24px;
        color: #fff;
        line-height: 34px;
        width: 100px;
        @include line-height(46px, 46px);
        background: #ff161b;
        border-radius: 24px;
      }
    }
  }
  .buy-plan {
    position: fixed;
    width: 100%;
    bottom: 0;
    .tip {
      background: #fff;
      height: 68px;
      @include flexSty(row, space-between, center);
      border-bottom: 2px solid rgba(0, 0, 0, 0.1);
      span {
        font-size: 24px;
        color: #666;
        line-height: 34px;
      }
    }
    .font15 {
      font-size: 30px;
      font-weight: bold;
      line-height: 42px;
    }
    .coupons {
      background: #fff;
      padding: 0px 32px;
      height: 86px;
      @include flexSty(row, space-between, center);
      .get-coupons {
        @include flexSty(row, space-between, center);
        span {
          font-size: 26px;
          font-weight: bold;
          color: #ff3b30;
          line-height: 36px;
          margin-right: 10px;
        }
      }
    }
    .pay-plan {
      @include flexSty(row, space-between, center);
      height: 98px;
        background: #f6f6f6;
      .font15 {
        padding-left: 32px;
      }
      .pay {
        color: #fff;
        width: 240px;
        height: 98px;
        @include line-height(98px, 98px);
        background: linear-gradient(
          90deg,
          rgba(255, 95, 80, 1) 0%,
          rgba(251, 15, 14, 1) 100%
        );
      }
    }
  }
}
</style>