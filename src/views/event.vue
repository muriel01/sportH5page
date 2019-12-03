<!--  -->
<template>
  <div id="event">
    <Navbar v-model="pageType" :tabArr="tabArr1" :navType="2" />

    <Navbar v-model="chooseExp" :tabArr="tabArr2" :navType="1" />
    <ul class="content">
      <li>
        <div class="game-type">
          <p class="font-sty">亚洲杯亚洲</p>
          <p class="font-sty">亚洲杯</p>
        </div>
        <div class="game-info">
          <div class="game-status">
            <p class="font-sty game-time">10-21 02:30</p>
            <p class="font-sty">未</p>
          </div>
          <div class="game-team">
            <span class="team-name" style="text-align: right">澳大利亚澳大</span>
            <span style="width:46px">VS</span>
            <span class="team-name" style="text-align: left">澳大利亚澳大</span>
          </div>
          <p class="font-sty">1 : 0</p>
        </div>
        <p class="focus">关注</p>
      </li>
    </ul>
    <Tabbar class="tabbar" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Tabbar from "@/components/Tabbar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Navbar,
    Tabbar
  },
  data() {
    //这里存放数据
    return {
      pageType: 1,
      chooseExp: 1,
      tabArr1: [
        {
          id: 1,
          name: "足球"
        },
        {
          id: 2,
          name: "篮球"
        }
      ],
      tabArr2: [
        {
          id: 1,
          name: "即时"
        },
        {
          id: 2,
          name: "完场"
        },
        {
          id: 3,
          name: "赛程"
        },
        {
          id: 4,
          name: "关注"
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
  created() {}
};
</script>
<style lang='scss' scoped>
#event {
  .content {
    @include flexSty(column, center, center);
    margin-top: 20px;
    li {
      width: 100%;
      height: 128px;
      padding: 20px 0px 24px 0px;
      @include flexSty(row, space-between, center);
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      //   box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.1);
      .font-sty {
        font-size: 20px;
        color: #777;
        line-height: 28px;
      }
      .game-type {
        margin-left: 32px;
        p:last-child {
          margin-top: 4px;
        }
      }
      .game-info {
        display: table;
        height: 100%;
        @include flexSty(column, space-between, center);
        .game-status {
          @include flexSty(row, space-between, center);
          .game-time {
            background: rgba(75, 153, 254, 0.09);
            border-radius: 16px;
            line-height:28px;
            padding: 2px 14px;
            margin-right: 10px;
          }
        }
        .game-team {
          font-size: 30px;
          font-weight: bold;
          line-height: 42px;
          display: table;
          span {
            display: table-cell;
          }
          .team-name {
            width: 200px;
          }
        }
      }
      .focus {
        font-size: 26px;
        color: #848ea0;
        margin-right: 32px;
      }
    }
  }
}
</style>