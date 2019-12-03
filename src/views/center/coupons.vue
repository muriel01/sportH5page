<!--  -->
<template>
  <div id="coupons">
    <HeaderTitle :title="title" />
    <Navbar v-model="chooseExp" :tabArr="tabArr2" v-if="type == 1" />
    <div v-if="chooseExp == 1">
      <ul>
        <li v-for="(item,index) in couponList" :key="index">
          <div class="cou-name">
            <p class="cou-money">
              <span class="cou-cont">{{item.money}}</span>
              <img class="gold" src="../../assets/images/gold.svg" alt="金豆" />
            </p>
            <p class="name">满{{item.condition_money}}金豆可用</p>
          </div>
          <div class="cou-info">
            <p class="cou-code">{{item.code}}</p>
            <p class="name">{{item.end_time}}到期</p>
          </div>
          <div class="cou-statu">
            <router-link
              :to="{path:'/'}"
              class="user-cps"
              v-if="item.is_valid == 1 && type == 1"
            >去使用</router-link>
            <img
              v-if="item.is_valid == 1 && type != 1"
              @click="chooseCoupon(index)"
              :src="require('../../assets/images/'+(item.isSelected ? 'selected.svg' :'cancel.svg'))"
              alt="选中优惠券"
            />
            <img v-if="item.is_valid == 0" src="../../assets/images/overdue.svg" alt="选中优惠券" />
          </div>
        </li>
      </ul>
      <div class="use-cou" v-if="type == 2">
        <p class="use-name">可抵扣{{selectCoupon.gold}}金豆</p>
        <p class="use" @click="()=>{
            this.$router.go(-1);
          }">确认使用</p>
      </div>
    </div>
    <BillList v-if="chooseExp == 2" :type="'coupon'" :listData="detailList" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTitle from "../../components/HeaderTitle";
import Navbar from "../../components/Navbar";
import BillList from "../../components/BillList";
import { mapActions } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTitle,
    Navbar,
    BillList
  },
  data() {
    //这里存放数据
    return {
      chooseExp: 1,
      type: 1,
      title: "优惠券",
      tabArr2: [
        {
          id: 1,
          name: "优惠券"
        },
        {
          id: 2,
          name: "明细"
        }
      ],
      couponList: [],
      detailList: [],
      selectCoupon: {
        gold: 0,
        name: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    chooseExp(val) {
      if (val == 1) {
        this.getCouponList();
      } else {
        this.getdetailList();
      }
    }
  },
  //方法集合
  methods: {
    ...mapActions("useCouponVux", ["chooseCouponFun"]),
    getCouponList() {
      this.$api
        .couponListApi({
          clientUserSession: localStorage.getItem("token"),
          page: 1,
          size: 10
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            this.couponList = res.data;
            this.couponList.forEach(item => {
              item.isSelected = false;
            });
          }
        });
    },
    getdetailList() {
      this.$api
        .couponDetailList({
          clientUserSession: localStorage.getItem("token"),
          page: 1,
          size: 10
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            this.detailList = res.data;
          }
        });
    },

    chooseCoupon(index) {
      console.log(this.couponList[index].isSelected);
      let statu = this.couponList[index];
      statu.isSelected = !statu.isSelected;
      if (statu.isSelected) {
        this.chooseCouponFun({
          couponId: statu.id,
          couponName:`满${statu.condition_money}金豆可用`
        });
        this.selectCoupon.gold = statu.money;
        this.selectCoupon.name = `满${statu.condition_money}金豆可用`;
      } else {
        this.selectCoupon.gold = 0;
        this.selectCoupon.name = ``;
        this.chooseCouponFun({
          couponId: 0,
          couponName:''
        });
      }
      this.$set(this.couponList, index, statu);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.type = this.$route.query.type;
    this.type == 2 ? (this.title = "使用优惠券") : (title.title = "优惠券");
    this.getCouponList();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#coupons {
  ul {
    margin: 20px 32px;
    li {
      @include flexSty(row, flex-start, center);
      background: #fff;
      height: 104px;
      padding: 30px 22px;
      margin-bottom: 20px;
      .name {
        font-size: 24px;
        color: #999;
        line-height: 34px;
      }
      .cou-name {
        min-width: 150px;
        .cou-money {
          @include flexSty(row, center, center);
          .cou-cont {
            font-size: 52px;
            font-weight: bolder;
            color: #ff3b30;
            line-height: 74px;
          }
          .gold {
            width: 34px;
            height: 34px;
          }
        }
      }
      .cou-info {
        height: 100%;
        @include flexSty(column, space-between, flex-start);
        margin: 0px 0px 0px 48px;
        width: 330px;
        .cou-code {
          font-size: 32px;
          font-weight: bold;
          line-height: 44px;
          margin-top: 14px;
        }
      }
      .cou-statu {
        width: 100%;
        @include flexSty(column, center, flex-end);
        .user-cps {
          font-size: 22px;
          font-weight: bold;
          color: #fff;
          @include line-height(48px, 48px);
          width: 100px;
          background: linear-gradient(
            90deg,
            rgba(255, 95, 80, 1) 0%,
            rgba(251, 15, 14, 1) 100%
          );
          border-radius: 24px;
        }
      }
    }
  }
  .use-cou {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 86px;
    background: #fff;
    @include flexSty(row, space-between, center);
    p {
      font-size: 30px;
      line-height: 42px;
    }
    .use-name {
      color: #ff3b30;
      padding-left: 32px;
    }
    .use {
      width: 242px;
      @include line-height(86px, 86px);
      background: #ff3b30;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>