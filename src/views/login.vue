<!--  -->
<template>
  <div id="login">
    <img src="../assets/images/right2.svg" @click="()=>{this.$router.go(-1)}" alt />
    <h3>手机号登录</h3>
    <div class="login-info">
      <div class="login-li">
        <input class="input-n" v-model="mobile" type="text" placeholder="请输入手机号" />
        <button
          class="get-code"
          :style="{color:disabled?'#FF9530':'#000'}"
          @click="getCodeFun"
          :disabled="disabled"
        >{{btntxt}}</button>
      </div>
      <div class="login-li">
        <input class="input-n" v-model="code" type="text" placeholder="请输入验证码" />
      </div>
    </div>
    <p class="btn" @click="loginFun">手机号快捷登录</p>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Toast } from "mint-ui";
import {mapActions} from 'vuex'

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
      mobile: "",
      code: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    $router(){
      console.log('$router');
    }
  },
  //方法集合
  methods: {
    ...mapActions("login",["login"]),
    getCodeFun() {
      if (!this.mobile) {
        Toast({
          message: "请输入手机号",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      this.$api
        .getCodeApi({
          mobile: this.mobile
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            Toast({
              message: "验证码已发送",
              position: "middle",
              duration: 2000
            });
            this.time = 60;
            this.disabled = true;
            this.timer();
          } else {
            Toast({
              message: "验证码获取失败",
              position: "middle",
              duration: 2000
            });
          }
        });
    },
    timer() {
      let _this = this;
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time;
        setTimeout(function() {
          _this.timer();
        }, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },

    loginFun() {
      this.$api
        .login({
          mobile: this.mobile,
          code: this.code
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            // localStorage.setItem("token", res.clientUserSession);
            this.getUserInfo(res.clientUserSession);
            Toast({
              message: "登录成功",
              position: "middle",
              duration: 2000
            });
          }
        });
    },

    getUserInfo(token) {
      this.$api
        .userInfoApi({
          clientUserSession: token
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            let userInfo = {
              avatar: res.avatar,
              mobile: res.mobile,
              name: res.username ? res.username : res.mobile,
              mobileBinded: res.mobileBinded,
              balance: res.balance,
              couponCount: res.coupon
            };
            this.login({
              token:token,
              userInfo:userInfo
            })
            // localStorage.setItem("userInfo", JSON.stringify(userInfo));

            this.$router.replace({
              path: "/user"
            });
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#login {
  background: #fff;
  img {
    display: block;
    text-align: left;
    margin: 24px 0px 0px 32px;
  }
  h3 {
    font-size: 48px;
    font-weight: bolder;
    line-height: 66px;
    text-align: left;
    margin: 68px 64px 84px;
  }
  .login-info {
    margin: 0px 64px;
    .login-li {
      @include flexSty(row, space-between, center);
      border-bottom: 1px solid #eee;
      height: 104px;
      .input-n {
        width: 50%;
        font-size: 32px;
        @include line-height(44px, 44px);
      }
      .get-code {
        font-size: 28px;
        line-height: 40px;
      }
    }
  }
  .btn {
    @include line-height(94px, 94px);
    background: linear-gradient(
      90deg,
      rgba(255, 95, 80, 1) 0%,
      rgba(251, 15, 14, 1) 100%
    );
    margin: 100px 64px 0px;
    border-radius: 2px;
    font-size: 36px;
    color: #fff;
  }
}
</style>