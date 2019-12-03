<!--  -->
<template>
  <div id="user">
    <div class="user-info">
      <div class="user-info-detail">
        <div class="user-name">
          <img
            :src="userInfo.avatar?userInfo.avatar:require('../../assets/images/user-header.svg')"
            alt
          />
          <p v-if="token">{{userInfo.username?userInfo.username:userInfo.mobile}}</p>
          <router-link tag="p" :to="{path:'/login'}" v-else>登录</router-link>
        </div>
        <router-link :to="{path:'/recharge',query:{money:userInfo.balance}}" class="recharge">充值</router-link>
      </div>
      <div class="user-money">
        <div class="moeny-del">
          <div class="money-more">
            <p class="money-type">
              <img src="../../assets/images/gold.svg" alt />
              <span>余额(金豆)</span>
            </p>
            <img
              @click="()=>{this.$router.push({path:'/balance'})}"
              src="../../assets/images/left.svg"
              alt
            />
          </div>
          <p class="money-count">{{userInfo.balance}}</p>
        </div>
        <div class="moeny-del">
          <div class="money-more">
            <p class="money-type">
              <img src="../../assets/images/coupons.svg" alt />
              <span>优惠券(张)</span>
            </p>
            <img
              @click="()=>{this.$router.push({path:'/coupons'})}"
              src="../../assets/images/left.svg"
              alt
            />
          </div>
          <p class="money-count">{{userInfo.couponCount}}</p>
        </div>
      </div>
    </div>
    <ul>
      <router-link tag="li" v-for="(item , index) in menuList" :to="{path:item.path}" :key="index">
        <img class="type-icon" :src="item.img" alt />
        <p>{{item.name}}</p>
        <img class="get-more" src="../../assets/images/left2.svg" alt />
      </router-link>
    </ul>
    <Tabbar class="tabbar" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Tabbar from "../../components/Tabbar.vue";
import { mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Tabbar
  },
  data() {
    //这里存放数据
    return {
      menuList: [
        {
          img: require("../../assets/images/order.svg"),
          name: "我的订单",
          path: "/order"
        },
        {
          img: require("../../assets/images/help.svg"),
          name: "帮助中心",
          path: "/order"
        },
        {
          img: require("../../assets/images/version.svg"),
          name: "版本更新",
          path: "/order"
        },
        {
          img: require("../../assets/images/set-up.svg"),
          name: "设置",
          path: "/setUp"
        }
      ]
      // username: "",
      // avatar: "",
      // mobile: "",
      // mobileBinded: "",
      // balance: "0",
      // coupon: "0"
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("login", ["token", "userInfo"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeCreate() {} //生命周期 - 创建之前
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#user {
  .user-info {
    background: url("../../assets/images/user-bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 70px 32px 0px;
    height: 340px;
    position: relative;
    .user-info-detail {
      @include flexSty(row, space-between, center);
      .user-name {
        @include flexSty(row, center, center);
        img {
          @include userHeader(100px, 100px);
          margin-right: 10px;
        }
        p {
          font-size: 36px;
          font-weight: bold;
          color: #fff;
          line-height: 50px;
        }
      }
      .recharge {
        font-size: 26px;
        font-weight: bold;
        color: #ff3b30;
        line-height: 36px;

        width: 148px;
        @include line-height(56px, 56px);
        background: #fff;
        border-radius: 28px;
      }
    }
    .user-money {
      position: absolute;
      @include flexSty(row, flex-start, center);
      width: 91.5%;
      top: 218px;
      background: #fff;
      height: 190px;
      border-radius: 12px;
      .moeny-del {
        width: 40%;
        height: 116px;
        padding-left: 40px;
        @include flexSty(column, space-between, flex-start);
        .money-more {
          width: 100%;
          @include flexSty(row, space-between, center);
          .money-type {
            @include flexSty(row, space-between, center);
            img {
              width: 34px;
              height: 34px;
            }
            span {
              font-size: 28px;
              line-height: 40px;
              margin-left: 10px;
            }
          }
        }
        .money-count {
          text-align: left;
          font-size: 50px;
          font-family: DINPro-Medium, DINPro;
          font-weight: bold;
          line-height: 64px;
        }
      }
      .moeny-del:nth-child(2) {
        border-left: 2px solid #e5e5e5;
        margin-left: 24px;
      }
    }
  }
  ul {
    background: #fff;
    border-radius: 12px;
    margin: 50px 32px;
    padding: 0px 32px;
    li {
      @include flexSty(row, flex-start, center);
      height: 112px;
      border-bottom: 1px solid #e9ecf5;
      p {
        font-size: 30px;
        line-height: 42px;
        margin-left: 20px;
      }
      .get-more {
        margin-left: auto;
      }
    }
    li:last-child {
      border-bottom: 0px;
    }
  }
}
</style>