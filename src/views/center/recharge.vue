<!--  -->
<template>
  <div id="recharge">
    <HeaderTitle :title="'充值'" />
    <p class="account-money">
      <img src="../../assets/images/gold.svg" alt />
      <span>账户余额 {{moeny}}金豆</span>
    </p>
    <div class="recharge-gd">
      <p class="reg-title">充值金额</p>
      <ul>
        <li
          @click="choosed = index"
          v-for="(item,index) in moneyArr"
          :key="index"
          :style="{border:choosed == index?'1px solid #FF3B30':'1px solid #E5E5E5'}"
        >
          <p class="money" :style="{color:choosed == index?'#FF3B30':'#333'}">{{item.money}}</p>
          <p class="gold" :style="{color:choosed == index?'#FF3B30':'#999'}">{{item.gold}}</p>
        </li>
      </ul>
    </div>
    <div class="tip">
      <p>温馨提示：</p>
      <p>
        筷子体育
        <span>非购彩平台</span>，金豆一经充值成功，只可用于购买专家方案，
        <span>不支持提现、购彩等操作</span>。
      </p>
    </div>
    <p class="pay">立即支付</p>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTitle from "../../components/HeaderTitle.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTitle
  },
  data() {
    //这里存放数据
    return {
      moeny: "",
      choosed: 0,
      moneyArr: [
        {
          money: "6元",
          gold: "12金豆"
        },
        {
          money: "30元",
          gold: "30金豆"
        },
        {
          money: "60元",
          gold: "60金豆"
        },
        {
          money: "88元",
          gold: "88金豆"
        },
        {
          money: "188元",
          gold: "188金豆"
        },
        {
          money: "388元",
          gold: "388金豆"
        }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.moeny = this.$route.query.money
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#recharge {
  .account-money {
    background: #fff;
    text-align: left;
    padding-left: 32px;
    @include line-height(96px, 96px);
    @include flexSty(row, flex-start, center, wrap);
    span {
      font-size: 28px;
      font-weight: bold;
      line-height: 40px;
      margin-left: 8px;
    }
  }
  .recharge-gd {
    background: #fff;
    margin-top: 20px;
    .reg-title {
      padding-left: 32px;
      text-align: left;
      @include line-height(80px, 80px);
      box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
      font-size: 28px;
      font-weight: bold;
    }
    ul {
      @include flexSty(row, flex-start, center, wrap);
      padding: 12px 20px 32px;
      li {
        width: 210px;
        margin-top: 20px;
        margin-left: 20px;
        height: 112px;
        background: #fff;
        border-radius: 4px;
        @include flexSty(column, center, center);
        .money {
          font-size: 30px;
          font-weight: bold;
          line-height: 42px;
        }
        .gold {
          font-size: 24px;
          line-height: 34px;
        }
      }
    }
  }
  .tip {
    margin: 40px 32px 0px;
    p {
      text-align: left;
      margin-top: 20px;
      font-size: 24px;
      color: #999;
      line-height: 34px;
      span {
        color: #ff3b30;
      }
    }
  }
  .pay {
    position: absolute;
    width: 100%;
    bottom: 0px;
    @include line-height(98px, 98px);
    background: linear-gradient(
      90deg,
      rgba(255, 95, 80, 1) 0%,
      rgba(251, 15, 14, 1) 100%
    );
    font-size: 34px;
    font-weight: bold;
    color: #fff;
  }
}
</style>