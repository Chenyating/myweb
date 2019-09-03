<template>
<div>
  <!-- 项目菜单 -->
  <div class="flex-row-around">
    <div v-for="(item ,index) in menu" :key="index" @click="showThis(index)">
      <img :class="{'choosed-img':index==choose}" :src="item.imgUrl" />
      <div :class="{'choosed-text':index==choose}">{{item.name}}</div>
    </div>
  </div>
  <reject v-if="projectList==null"></reject>
  <!-- 项目详情 0：自己的作品 1：h5页面，2：官网 3、小程序-->
  <div v-else class="project-item" v-for="(item,index) in projectList" :key="index">
    <!-- 自己作品 -->
    <div v-if="item.type==0">
      <!-- 标题 -->
      <div class="project-title-box" @click="goUrl(item)">
        <img :src="playImg" />
        <div class="title">{{item.name}}</div>
      </div>
      <div class="content" @click="goUrl(item)">{{item.intro}}</div>
      <div class="flex-row-between">
        <div class="gray-text">{{item.time}}</div>
        <div class="icon-readMore" @click="readMore(item)">阅读全文</div>
      </div>
    </div>
    <!-- h5 -->
    <div class="flex-row-between h5-title-box" v-if="item.type==1" @click="goUrl(item)">
      <!-- 标题 -->
      <img class="h5-img" :src="item.img" />
      <div class="title">{{item.name}}</div>
      <div class="gray-text">{{item.time}}</div>
    </div>
    <!-- 官方商城-->
    <div class="flex-row-between" v-if="item.type==2" @click="goUrl(item)">
      <!-- 标题 -->
      <div class="guanfang-title-box">
        <img class="guanfang-img" :src="item.img?item.img:ifImg" />
        <div class="title">{{item.name}}</div>
        <div class="gray-text">{{item.time}}</div>
      </div>
      <div class="content">{{item.intro}}</div>
    </div>
    <!-- 小程序 -->
    <div v-if="item.type==3" @click="goUrl(item)">
      <div class="title">{{item.name}}</div>
      <div class="content">{{item.intro}}</div>
      <div class="gray-text">{{item.time}}</div>
    </div>
  </div>
</div>
</template>

<script>
import SERVER from '~/assets/server/api.js';
import reject from "~/components/mobile/reject";
export default {
  transition: 'mobilePage',
  components: {
    reject
  },
  data() {
    return {
      ifImg: require("~/static/mobile/index/iftu.jpg"),
      playImg: require("~/static/mobile/index/play.png"),
      show: true,
      choose: 0,
      menu: [{
          name: "自己瞎搞",
          imgUrl: require("~/static/mobile/index/me.png")
        },
        {
          name: "H5页面",
          imgUrl: require("~/static/mobile/index/h5.png")
        },
        {
          name: "官方网页",
          imgUrl: require("~/static/mobile/index/guanfang.png")
        },
        {
          name: "小程序",
          imgUrl: require("~/static/mobile/index/weapp.png")
        }
      ],
      projectList: null,
      num: 100, //每页数量
      page: 0, //分页
      projectType: 0, //项目类型
      ifmore: false, //是否还有更多
    };
  },
  methods: {
    // 显示当前选中的项目
    showThis(index) {
      [this.show, this.choose] = [!this.show, index];
      [this.projectType, this.page] = [index, 0];
      setTimeout(() => {
        this.show = !this.show;
        this.getProjectByType();
      }, 1000);
    },
    // 根据项目类型返回项目列表
    getProjectByType() {
      var params = {
        tableName: 'project',
        type: this.projectType,
        num: this.num,
        page: this.page,
      }
      this.projectList = null;
      // 接口方法
      SERVER.getProjectByType(params).then((data) => {
        if (data.data.length == 0) {
          this.ifmore = false
        } else {
          this.projectList = data.data
        }
      }).catch((err) => {
        this.$Message.error("请求失败惹……(╥╯^╰╥)");
      })
    },
    // 页面跳转
    goUrl(item) {
      // 如果存在路径，则开启。
      if (item.url) {
        window.open(item.url)
      }
    },
    readMore(item) {
      if (item.articleUrl) {
        window.open(item.articleUrl)
      }
    }
  },
  mounted() {
    this.getProjectByType();
  }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
// 伪类图标
.icon-readMore {
  line-height: @distansBig;
  &:after {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    margin-right: @distansSmall;
    .icon(@width: 15px);
    background: url(@img-more) no-repeat;
    background-size: 100%;
  }
}

// 图标
.icon {
  width: 40px;
  height: auto;
}

.h5-img {
  .icon(@width: 80px);
  margin: @distansBig 0;
}

.guanfang-img {
  height: 80PX;
  width: auto;
}

.weapp-img {
  height: 50px;
  width: auto;
}

// 菜单样式
// 选中的项目颜色；
.choosed-img {
  text-align: center;
  font-weight: bold;
  animation: rotateLong 10s infinite;
}

.choosed-text {
  text-align: center;
  font-weight: bold;
}

.flex-row-around {
  margin: @distansBig;
  img {
    .icon();
  }
}

// 项目样式
.project-item {
  padding: @distansBig;
  border-bottom: @line-sizeSmall @line-color solid;
}

.project-item:last-child {
  padding: @distansSmall @distansBig;
  border-bottom: 0 @line-color solid;
}

.project-title-box {
  .flex();
}

.flex-row-between {
  .guanfang-title-box {
    width: 40%;
    text-align: center;
  }
  .content {
    width: 60%;
  }
}

.weapp-title-box {
  text-align: center;
}

.h5-title-box {
  .title {
    width: 50%;
    padding: @distansBig;
  }
}
</style>

