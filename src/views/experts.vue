<template>
  <div id="experts">
    <Navbar v-model="pageType" :tabArr="tabArr1" :navType="2" />
    <div class="content1" v-if="pageType==1">
      <Navbar v-model="focusType" :tabArr="focusArr" :navType="1" :styObj="styObj" />
      <div>
        <ExpertsList v-if="focusType == 1" :listData="focusList" :onFocus="true" />
        <PlanList v-if="focusType == 2" :listData="focusPlanList" />
      </div>
    </div>
    <div class="content2" v-if="pageType == 2">
      <Navbar v-model="chooseType" :tabArr="tabArr3" :navType="1" :styObj="styObj" />
      <div>
        <ExpertsList :listData="expertsList" />
      </div>
    </div>
    <Tabbar class="tabbar" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import Tabbar from "@/components/Tabbar.vue";
import Navbar from "@/components/Navbar.vue";
import ExpertsList from "@/components/ExpertsList.vue";
import PlanList from "@/components/PlanList.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Tabbar,
    Navbar,
    ExpertsList,
    PlanList
  },
  data() {
    //这里存放数据
    return {
      pageType: 1, //页面分类
      focusType: 1, //选择关注分类
      chooseType: 1, //选择足球分类
      tabArr1: [
        {
          id: 1,
          name: "关注"
        },
        {
          id: 2,
          name: "足球"
        },
        {
          id: 3,
          name: "篮球"
        }
      ],
      focusArr: [
        {
          id: 1,
          name: "关注的专家"
        },
        {
          id: 2,
          name: "关注的专家方案"
        }
      ],
      tabArr3: [
        {
          id: 1,
          name: "全部"
        },
        {
          id: 2,
          name: "盈利榜"
        },
        {
          id: 3,
          name: "命中榜"
        }
      ],
      styObj: {
        width: "30%",
        justifyContent: "flex-start"
      },

      focusList: [],
      focusPlanList: [],
      expertsList: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    pageType(newVal) {
      if (newVal == 1) {
        this.focusType = 1;
      } else if (newVal == 2 || newVal == 3) {
        this.getExpertsList();
      }
    },
    chooseType(newVal) {
      this.getExpertsList();
    },
    focusType(newVal) {
      if (newVal == 1) {
        this.focusExperts();
      } else {
        this.focusPlan();
      }
    }
  },
  //方法集合
  methods: {
    focusExperts() {
      this.$api
        .myExpertList({
          clientUserSession: localStorage.getItem("token"),
          page: 1,
          size: 10
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            this.focusList = res.data;
          }
        });
    },
    focusPlan() {
      this.$api
        .myExpertOrderList({
          clientUserSession: localStorage.getItem("token"),
          page: 1,
          size: 10
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            this.focusPlanList = res.data;
          }
        });
    },

    getExpertsList() {
      this.$api
        .expertListApi({
          type: this.chooseType - 1,
          lotteryID: this.pageType == 2 ? 10059 : 10058,
          page: 1,
          size: 10,
          clientUserSession: localStorage.getItem("token")
        })
        .then(res => {
          console.log(res);
          if (res.flag == 1) {
            this.expertsList = res.data;
          }
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let pageType = this.$route.query.pageType;
    this.pageType = pageType? pageType: 1;
    this.focusExperts();
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>