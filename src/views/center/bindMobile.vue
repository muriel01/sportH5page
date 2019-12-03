<!--  -->
<template>
  <div id="bindMobile">
    <HeaderTitle :title="type == 1?'绑定手机号码':'解绑手机号码'" />
    <div class="bind-info">
      <div class="bind-li">
        <p class="bind-n">{{type == 1? '新号码':'原号码'}}</p>
        <input type="text" class="input-num" v-model="mobile" placeholder="请输入手机号码" />
      </div>
      <div class="bind-li">
        <div class="bind-code">
          <p class="bind-n">验证码</p>
          <input type="text" v-model="code" class="input-num" placeholder="请输入验证码" />
        </div>
        <button
          class="bind-n code-btn"
          :style="{color:disabled?'#FF9530':'#000'}"
          @click="getCodeFun"
          :disabled="disabled"
        >{{btntxt}}</button>
      </div>
    </div>

    <p :class="[code!='' ? 'bind2':'bind1','bind']" @click="bindMobile">{{type == 1?'绑定':'下一步'}}</p>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTitle from "../../components/HeaderTitle";
import { Toast } from "mint-ui";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTitle
  },
  data() {
    //这里存放数据
    return {
      type: 2,
      mobile: "",
      btntxt: "获取验证码",
      disabled: false,
      time: 0,
      code: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getCodeFun() {
      this.$api
        .getCodeApi({
          clientUserSession: localStorage.getItem("tolen"),
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

    bindMobile() {
      if (this.type == 1 && !this.mobile) {
        Toast({
          message: "请输入手机号",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (!this.code) {
        Toast({
          message: "请填写验证码",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      this.$api
        .isbindMobile({
          clientUserSession: localStorage.getItem("token"),
          mobile: this.mobile,
          code: this.code,
          type: this.type == 2 ? 1 : 0
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            if (this.type == 2) {
              this.type = 1;
              this.mobile = "";
              this.code = "";
              this.time = 0;
              this.btntxt = "获取验证码";
              this.disabled = false;
            } else {
              Toast({
                message: "绑定成功",
                position: "middle",
                duration: 2000
              });
            }
          } else {
            Toast({
              message: res.errorMessage,
              position: "middle",
              duration: 2000
            });
          }
        });
    }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.mobile =
      this.type == 2 ? JSON.parse(localStorage.getItem("userInfo")).mobile : "";
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#bindMobile {
  .bind-info {
    background: #fff;
    padding: 0px 32px;
    .bind-li {
      @include flexSty(row, flex-start, center);
      height: 104px;
      .bind-n {
        font-size: 32px;
        color: #000;
        line-height: 44px;
      }
      .bind-code {
        @include flexSty(row, flex-start, center);
      }
      .input-num {
        width: 50%;
        @include line-height(44px, 44px);
        font-size: 32px;
        margin-left: 50px;
      }
      .code-btn {
        text-align: right;
        width: 190px;
      }
    }
    .bind-li:first-child {
      border-bottom: 1px solid #eee;
    }
  }
  .bind {
    font-size: 36px;
    color: #fff;
    line-height: 50px;
    margin: 74px 32px 0px;
    @include line-height(94px, 94px);
    border-radius: 2px;
  }
  .bind1 {
    background: rgba(227, 228, 229, 1);
  }
  .bind2 {
    background: linear-gradient(
      90deg,
      rgba(255, 95, 80, 1) 0%,
      rgba(251, 15, 14, 1) 100%
    );
  }
}
</style>