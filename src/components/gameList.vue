<!--  -->
<template>
  <div id="GameList">
    <ul>
      <li v-for="(item,index) in gameInfoObj" :key="index">
        <p class="game-time">
          <span>[{{type==10059?'竞足':'竞篮'}}] </span>
          <span> {{item.leagueName}}</span>
          <span> {{item.weekday | weekFilter}}{{item.teamId}}</span>
          <span> {{item.matchTime | gameTime}}</span>
        </p>
        <img v-if="status == 501" class="win-stu" src="../assets/images/winning.svg" alt />
        <img v-if="status == 601" class="win-stu" src="../assets/images/winning-no.svg" alt />
        <div class="game-team">
          <div>
            <!-- <img src="../assets/logo.png" alt /> -->
            <p class="team-name">{{type==10059?item.hostName:item.guestName}}</p>
          </div>
          <div class="team-status">
            <p class="game-time" v-if="status != 501 && status != 601" style="color:#FF9530">进行中…</p>
            <p class="team-score">VS</p>
          </div>
          <div>
            <!-- <img src="../assets/logo.png" alt /> -->
            <p class="team-name">{{type==10059?item.guestName:item.hostName}}</p>
          </div>
        </div>

        <div class="game-list" v-if="type == 10059">
          <div class="game-type" v-for="(item2,index2) in item.gameList" :key="index2">
            <p class="game-type-1">
              <span>主让</span>
              <span>{{item2.rate}}</span>
            </p>
            <div class="game-results">
              <p
                :class="(index2 == 0 ? item2.choose.indexOf('3')>-1 : item2.choose.indexOf('303')>-1) ? 'choose':''"
              >
                <span>主胜</span>
                <span>{{item2.sheng}}</span>
                <img
                  v-if="index2==0? item2.result == 3 : item2.result == 303"
                  src="../assets/images/selected.svg"
                  alt="主队胜"
                />
              </p>
              <p
                :class="(index2 == 0 ? item2.choose.indexOf('1')>-1 : item2.choose.indexOf('301')>-1) ? 'choose':''"
              >
                <span>平</span>
                <span>{{item2.ping}}</span>
                <img
                  v-if="index2==0? item2.result == 1 : item2.result == 301"
                  src="../assets/images/selected.svg"
                  alt
                />
              </p>
              <p
                :class="(index2 == 0 ? item2.choose.indexOf('0')>-1 : item2.choose.indexOf('300')>-1) ? 'choose':''"
              >
                <span>客胜</span>
                <span>{{item2.fu}}</span>
                <img
                  v-if="index2==0? item2.result == 0 : item2.result == 300"
                  src="../assets/images/selected.svg"
                  alt
                />
              </p>
            </div>
          </div>
        </div>
        <div class="game-list" v-if="type == 10058">
          <div class="game-type" v-for="(item2,index2) in item.gameList" :key="index2">
            <p class="game-type-1">
              <span>{{item2.gameType}}</span>
              <span>{{item2.rate}}</span>
            </p>
            <div class="game-results">
              <p
                :class="(index2 == 0 ? item2.choose.indexOf('3')>-1:(index2 == 1 ?item2.choose.indexOf('101')>-1 :item2.choose.indexOf('303')>-1))? 'choose':''"
              >
                <span>客胜</span>
                <span>{{item2.sheng}}</span>
                <img
                  v-if="index2==0? item2.result == 3 : item2.result == 303"
                  src="../assets/images/selected.svg"
                  alt="客队胜"
                />
              </p>
              <p
                :class="(index2 == 0 ? item2.choose.indexOf('0')>-1 : (index2 == 1 ?item2.choose.indexOf('100')>-1 :item2.choose.indexOf('300')>-1)) ? 'choose':''"
              >
                <span>主胜</span>
                <span>{{item2.fu}}</span>
                <img
                  v-if="index2==0? item2.result == 0 : item2.result == 300"
                  src="../assets/images/selected.svg"
                  alt
                />
              </p>
            </div>
          </div>
        </div>

        <div class="game-more">
          <p>查看更多赛事信息</p>
          <img src="../assets/images/left.svg" alt="查看更多赛事信息" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
      status:{
          type:Number,
          default:0,
      },
    type: {
      type: Number,
      default: 10059
    },
    listData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    //这里存放数据
    return {
      gameInfoObj: ""
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    takeFootData() {
      let chooseTypeArr = [3, 1, 0, 303, 301, 300];
      this.gameInfoObj.forEach(item => {
        //   已结束的赛事通过赛果判断显示赛事条数
        item.gameList = [];
        // 赛事列表
        let gameList = [
          {
            rate: 0,
            sheng: item.sheng,
            ping: item.ping,
            fu: item.fu,
            choose: [],
            result: ""
          },
          {
            rate: item.rate,
            sheng: item.rqsheng,
            ping: item.rqping,
            fu: item.rqfu,
            choose: [],
            result: ""
          }
        ];

        //      进行中的赛事不展示专家选择结果
        if (item.status == 501 || item.status == 601) {
          let choose = item.choose.split(",");
          //   对赛果进行判断、展示
          let result = item.result.split(",");
          for (let j = 0; j < result.length; j++) {
            if (result[j] < 100) {
              gameList[0].result = result[j];
            //   if(choose.indexOf(result[j])>-1){

            //   }
            } else {
              gameList[1].result = result[j];
            }
          }
          for (let i = 0; i < choose.length; i++) {
            gameList[0].choose.push(choose[i]);
            if (chooseTypeArr.indexOf(parseInt(choose[i])) > -1) {
              if (chooseTypeArr.indexOf(choose[i]) < 3) {
                gameList[0].choose.push(choose[i]);
              } else {
                gameList[1].choose.push(choose[i]);
              }
            }
          }
          console.log(gameList);
          for (let k = 0; k < gameList.length; k++) {
            if (gameList[k].choose.length > 0) {
              item.gameList.push(gameList[k]);
            }
          }
        } else {
          item.gameList = gameList;
        }
      });
    },
    getBasketData() {
      let chooseTypeArr = [3, 0, 101, 102, 303, 300];
      this.gameInfoObj.forEach(item => {
        //   已结束的赛事通过赛果判断显示赛事条数
        item.gameList = [];
        // 赛事列表
        let gameList = [
          {
            gameType: "主让",
            rate: 0,
            sheng: item.sheng,
            fu: item.fu,
            choose: [],
            result: ""
          },
          {
            gameType: "大小分",
            rate: item.basepoint, //大小分
            sheng: item.da,
            fu: item.xiao,
            choose: [],
            result: ""
          },
          {
            gameType: "主让",
            rate: item.rate,
            sheng: item.rfsheng,
            fu: item.rffu,
            choose: [],
            result: ""
          }
        ];

        //      进行中的赛事不展示专家选择结果
        if (item.status == 501 || item.status == 601) {
          let choose = item.choose.split(",");
          //   对赛果进行判断、展示
          let result = item.result.split(",");
          for (let j = 0; j < result.length; j++) {
            if (result[j] < 100) {
              gameList[0].result = result[j];
            } else if (result[j] < 100) {
              gameList[1].result = result[j];
            } else {
              gameList[2].result = result[j];
            }
          }
          for (let i = 0; i < choose.length; i++) {
            gameList[0].choose.push(choose[i]);
            if (chooseTypeArr.indexOf(parseInt(choose[i])) > -1) {
              if (chooseTypeArr.indexOf(choose[i]) < 2) {
                gameList[0].choose.push(choose[i]);
              } else if (chooseTypeArr.indexOf(choose[i]) < 4) {
                gameList[1].choose.push(choose[i]);
              } else {
                gameList[2].choose.push(choose[i]);
              }
            }
          }
          console.log(gameList);
          for (let k = 0; k < gameList.length; k++) {
            if (gameList[k].choose.length > 0) {
              item.gameList.push(gameList[k]);
            }
          }
        } else {
          item.gameList = gameList;
        }
      });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.listData);
    this.gameInfoObj = this.listData;
    if (this.type == 10059) {
      this.takeFootData();
    } else {
      this.getBasketData();
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
#GameList {
  ul {
    margin-bottom: 20px;
    li {
      background: #fff;
      margin-top: 20px;
      padding: 32px;
      position: relative;
      .game-time {
        font-size: 24px;
        color: #777;
        line-height: 34px;
        text-align: left;
        margin-bottom: 28px;
      }
      .win-stu {
        position: absolute;
        top: 32px;
        right: 32px;
      }
      .game-team {
        display: table;
        margin: auto;
        // @include flexSty(row, center, center);
        div {
          display: table-cell;
          height: 120px;
          width: 33.333%;
          vertical-align: middle;
        }
        img {
          @include userHeader(46px, 46px);
          background: #fff;
          border: 4px solid #e5e5e5;
        }
        .team-name {
          font-size: 28px;
          font-weight: bold;
          line-height: 40px;
        }
        .team-status {
          .game-time {
            text-align: center;
          }
          .team-score {
            font-size: 42px;
            font-weight: bold;
            line-height: 58px;
            margin-top: 18px;
          }
        }
      }
      .game-list {
        margin-top: 28px;
        .game-type {
          margin-top: 20px;
          @include flexSty(row, space-between, center);
          .game-type-1 {
            width: 80px;
            height: 60px;
            background: #f5f7fa;
            font-size: 24px;
            line-height: 34px;
            padding: 10px 0px;
            @include flexSty(column, space-between, center);
          }
          .game-results {
            @include flexSty(row, space-between, center);
            width: 564px;
            border-radius: 4px;
            height: 76px;
            border: 2px solid rgba(217, 217, 217, 1);
            .choose {
              background: #34465b;
              color: #fff;
            }
            p {
              @include flexSty(column, space-between, center);
              width: 50%;
              padding: 10px 0px;
              position: relative;
              img {
                position: absolute;
                right: 15px;
                bottom: -10px;
              }
            }
            p:not(:first-child) {
              border-left: 2px solid rgba(217, 217, 217, 1);
            }
            span {
              font-size: 26px;
              line-height: 30px;
            }
          }
        }
      }
      .game-more {
        background: #f5f7fa;
        border-radius: 8px;
        height: 62px;
        margin-top: 40px;
        @include flexSty(row, center, center);
        position: relative;
        p {
          font-size: 24px;
          color: #666;
          line-height: 34px;
        }
        img {
          position: absolute;
          right: 20px;
        }
      }
    }
  }
}
</style>