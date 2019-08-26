<template>
<div>
  <!-- 项目菜单 -->
  <div class="flex-row-around">
    <div v-for="(item ,index) in menu" :key="index" @click="showThis(index)">
      <img :class="{'choosed-img':index==choose}" :src="item.imgUrl" />
      <div :class="{'choosed-text':index==choose}">{{item.name}}</div>
    </div>
  </div>
  <!-- 项目详情 -->
  <div v-if="projectList" v-for="(item,index) in projectList" :key="index">
    <div class="project-item" v-if="show">
      <div class="flex-item">
        <img v-if="projectType!=0" class="icon" :src="item.img" width="120" />
        <div class="name">{{item.name}}</div>
      </div>
      <div class="flex-row-between">
        <div class="gray-text">{{item.time}}</div>
        <div v-if="projectType==0">去玩一下</div>
        <div v-if="projectType==1||projectType==2" @click="readWeb()">查看页面</div>
        <div v-if="projectType==3">去预览</div>
      </div>
      <div class="content">{{item.intro}}</div>
      <div class="text-right" v-if="projectType==0" @click="readArticle()">查看文章</div>
      <!-- 标签 -->
      <Tag v-if="item.keyword" color="magenta">{{item.keyword}}</Tag>
    </div>
  </div>
</div>
</template>
<script>
import SERVER from '~/assets/server/api.js'
export default {
  transition: 'mobilePage',
  data() {
    return {
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
      // 接口方法
      SERVER.getProjectByType(params).then((data) => {
        if (data.data.length == 0) {
          this.ifmore = false
        } else {
          this.projectList = data.data
        }
      }).catch((err) => {

      })
    },
    // 阅读文章
    readArticle() {

    },
    // 查看页面
    readWeb() {

    }
  },
  mounted() {
    this.getProjectByType();
  }
};
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.icon {
  width: 40px;
  height: auto;
}

// 选中的项目颜色；
.choosed-img {
  text-align: center;
  font-weight: bold;
  animation: choosed 10s infinite;
}

.choosed-text {
  text-align: center;
  font-weight: bold;
  color: @red;
}

.flex-row-around {
  margin: @distansBig;
  img {
    .icon();
  }
}

.project-item {
  width: 100%;
  padding: @distansBig;
  .flex-item {
    .flex();
    align-items: center;
  }
  .name {
    .text();
    margin-left: @distansBig;
    font-weight: bold;
  }
  .item-content {
    .text();
  }
  .text-right {
    .text();
    text-align: right;
  }
  .item-key {
    color: @red;
  }
}

// 被选中的动画
@keyframes choosed {
  30% {
    transform: scale(1) rotate(180deg);
  }
  60% {
    transform: scale(.5) rotate();
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>

