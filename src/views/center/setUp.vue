<!--  -->
<template>
  <div id="setUp">
    <HeaderTitle :title="'设置'" />
    <ul>
      <li>
        <p class="set-t">头像</p>
        <p class="user-tit">
          <img
            class="user-img"
            :src="userInfo.avatar?userInfo.avatar:require('../../assets/images/user-header.svg')"
            alt
          />
          <img class="left-img" src="../../assets/images/left.svg" alt />
        </p>
      </li>
      <li>
        <p class="set-t">昵称</p>
        <p class="set-tip">{{userInfo.name?userInfo.name:'未填写'}}</p>
      </li>
      <li>
        <p class="set-t">手机号码</p>
        <p class="user-tit">
          <span class="set-tip">{{userInfo.mobile?userInfo.mobile:'未绑定'}}</span>
          <img
            class="left-img"
            @click="()=>{this.$router.push({path:'/bindMobile'})}"
            src="../../assets/images/left.svg"
            alt
          />
        </p>
      </li>
    </ul>
    <p class="out-act" @click="outLogin">退出账号</p>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import HeaderTitle from "../../components/HeaderTitle";
import { mapState, mapActions } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    HeaderTitle
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState("login", ["token", "userInfo"])
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapActions("login", ["login"]),
    outLogin() {
      this.login({
        token: "",
        userInfo: ""
      }).then(res => {
        this.$router.push({
          path: "/login"
        });
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#setUp {
  ul {
    background: #fff;
    margin-top: 20px;
    padding: 0px 32px;
    li {
      @include flexSty(row, space-between, center);
      height: 104px;
      border-bottom: 2px solid #eee;
      .set-t {
        font-size: 32px;
        line-height: 44px;
      }
      .user-tit {
        @include flexSty(row, center, center);
      }
      .user-img {
        @include userHeader(68px, 68px);
      }
      .set-tip {
        font-size: 32px;
        color: #999;
        line-height: 44px;
      }
      .left-img {
        margin-left: 18px;
      }
    }
  }
  .out-act {
    position: absolute;
    bottom: 0px;
    width: 91.5%;
    font-size: 36px;
    font-weight: bold;
    color: #fff;
    line-height: 50px;
    margin: 0px 32px 26px;
    @include line-height(94px, 94px);
    background: linear-gradient(
      90deg,
      rgba(255, 95, 80, 1) 0%,
      rgba(251, 15, 14, 1) 100%
    );
    border-radius: 4px;
  }
}
</style>