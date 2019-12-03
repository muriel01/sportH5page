<!--  -->
<template>
  <div id="expertsInfo">
    <div class="experts-info">
      <img class="rtn" @click="()=>{this.$router.go(-1)}" src="../assets/images/right.svg" alt />
      <div class="experts-intr">
        <div class="experts-more">
          <img :src="expertsInfo.avatar" alt />
          <p class="experts">
            <span class="exp-name">{{expertsInfo.username}}</span>
            <span class="exp-fans">{{expertsInfo.fansNum}} 粉丝</span>
          </p>
        </div>
        <p
          :class="['focus',expertsInfo.isConcern == 1?'focus-on':'']"
        >{{expertsInfo.isConcern == 1?'已关注':'关注'}}</p>
      </div>
      <div class="exp-results">
        <div>
          <p class="results">{{expertsInfo.sevenDayProfit}}%</p>
          <p class="res-type">近7天盈利率</p>
        </div>
        <div>
          <p class="results">{{expertsInfo.sevenDayRecord}}%</p>
          <p class="res-type">近7天命中率</p>
        </div>
        <div>
          <p class="results">254%</p>
          <p class="res-type">推荐中奖(元)</p>
        </div>
      </div>
    </div>
    <div class="content">
      <p class="con-tit">方案战绩</p>
      <div class="con-info">
        <p v-for="(item,index) in tenRecord" :key="index">
          <img
            :src="require('../assets/images/plan-res-'+(item == 1?'ok':'no')+'.svg')"
            alt
          />
        </p>
      </div>
    </div>
    <div class="content">
      <p class="con-tit">最新方案</p>
      <PlanList :planType="0" :listData="listData"/>
    </div>
    <div class="content">
      <p class="con-tit">历史方案</p>
      <PlanList :planType="0" :isHistory="true" />
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import PlanList from "../components/PlanList.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    PlanList
  },
  data() {
    //这里存放数据
    return {
      expertsInfo: {
        avatar: "",
        username: "",
        fansNum: "",
        isConcern: 0,
        sevenDayProfit: "", //近7天盈利率
        sevenDayRecord: "" //近7天命中率
      },
      tenRecord: [], //方案战绩
      listData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getExpertsInfo() {
      this.$api
        .expertDetailApi({
          id: this.$route.query.id,
          clientUserSession: localStorage.getItem("token")
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            this.expertsInfo.avatar = res.avatar;
            this.expertsInfo.username = res.username;
            this.expertsInfo.fansNum = res.fansNum;
            this.expertsInfo.isConcern = res.isConcern;
            this.expertsInfo.sevenDayProfit = res.sevenDayProfit;
            this.expertsInfo.sevenDayRecord = res.sevenDayRecord;
            this.tenRecord = res.tenRecord.split(",");
            this.listData = res.data;
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getExpertsInfo();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#expertsInfo {
  .experts-info {
    padding: 122px 32px 32px 32px;
    height: 252px;
    background: url("../assets/images/experts-bg.svg") no-repeat;
    background-position: 50% 100%;
    background-size: cover;
    @include flexSty(column, space-between, center);
    position: relative;
    .rtn {
      position: absolute;
      top: 32px;
      left: 32px;
    }
    p,
    span {
      color: #fff;
    }
    .experts-intr {
      width: 100%;
      @include flexSty(row, space-between, center);
      .experts-more {
        @include flexSty(row, space-between, center);
        img {
          @include userHeader(112px, 112px);
        }
        .experts {
          height: 80px;
          margin-left: 30px;
          @include flexSty(column, space-between, center);
          .exp-name {
            font-size: 36px;
            font-weight: bold;
            line-height: 50px;
          }
          .exp-fans {
            font-size: 22px;
            line-height: 32px;
          }
        }
      }
      .focus {
        font-size: 26px;

        width: 128px;
        @include line-height(52px, 52px);
        border-radius: 26px;
      }
      .focus-no {
        border: 2px solid #fff;
      }
      .focus-on {
        background: #dd0e12;
      }
    }
    .exp-results {
      width: 100%;
      @include flexSty(row, space-around, center);
      margin-top: 36px;
      .results {
        font-size: 38px;
        font-weight: bold;
        line-height: 50px;
      }
      .res-type {
        font-size: 24px;
        line-height: 34px;
      }
    }
  }
  .content {
    background: #fff;
    margin-top: 20px;
    .con-tit {
      font-size: 28px;
      font-weight: bold;
      text-align: left;
      padding-left: 32px;

      @include line-height(80px, 80px);
      box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
    }
    .con-info {
      @include flexSty(row, flex-start, center);
      height: 106px;
      padding-left: 12px;
      img {
        @include userHeader(54px, 54px);
        margin-left: 20px;
      }
    }
  }
}
</style>