<template>
  <div class="home">
    <mt-swipe class="banner" :show-indicators="false">
      <mt-swipe-item v-for="(item,index) in appBanners" :key="index">
        <img :src="item.imgUrl" alt="广告图" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="experts-list">
      <Navbar v-model="expertsType" :tabArr="expertsTypeArr" />
      <div class="experts-show">
        <div class="experts-li" v-for="(item,index) in experts" :key="index">
          <div @click="getMoreExperets(item)">
            <img :src="item.avatar" alt />
            <p class="user-name">{{item.username}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <!-- <Navbar v-model="selected" :tabArr="tabArr1" /> -->
      <PlanList class="experts-con" :listData="list" />
    </div>
    <Tabbar class="tabbar" />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Tabbar from "@/components/Tabbar.vue";
import PlanList from "@/components/PlanList.vue";
import { getIndex } from "api/index";
import { Toast } from "mint-ui";
import { mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    Navbar,
    Tabbar,
    PlanList
  },
  data() {
    return {
      expertsType: 1,
      expertsTypeArr: [
        {
          id: 1,
          name: "足球专家"
        },
        {
          id: 2,
          name: "篮球专家"
        }
      ],
      experts: [],
      appBanners: [],
      basketballExperts: [],
      footballExperts: [],
      list: []
    };
  },
  watch: {
    expertsType(newVal) {
      if (newVal == 1) {
        this.experts = this.footballExperts;
      } else {
        this.experts = this.basketballExperts;
      }
    }
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    ...mapMutations({
      chooseTab: "updateTablocal"
    }),
    getList() {
      this.$api.getIndex({}).then(res => {
        console.log(res);
        if (res.flag == 1) {
          this.appBanners = res.appBanners;
          this.basketballExperts = res.basketballExperts;
          this.footballExperts = res.footballExperts;
          this.experts = this.footballExperts;
          this.experts.push({
            avatar: require("../assets/images/moreExperts.svg"),
            more: true,
            username: "更多"
          });
          this.list = res.list;
        }
      });
    },

    getMoreExperets(item) {
      if (item.more) {
        this.chooseTab({
          tablocal: 2,
          path: "/experts",
          query: {
            pageType: this.expertsType == 1 ? 2 : 3
          },
          $router: this.$router
        });
      } else {
        this.$router.push({
          path: "/expertsInfo",
          query: { id: item.id }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .banner {
    height: 360px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .experts-list {
    background: #fff;
    .experts-show {
      height: 364px;
      padding: 18px 0px 16px;
      @include flexSty(row, flex-start, flex-start, wrap);
      .experts-li {
        width: 25%;
        img {
          @include userHeader(96px, 96px);
        }
        .user-name {
          font-size: 24px;
        }
      }
    }
  }
  .content {
    margin-top: 20px;
    background: #fff;
    margin-bottom: 120px;
    .experts-con {
      margin: 0 32px;
    }
  }
}
</style>
