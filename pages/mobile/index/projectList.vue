<template>
<div>
  <!-- 项目菜单 -->
  <div class="flex-row-around">
    <div v-for="(item ,index) in menu" :key="index" @click="showThis(index)">
      <img :src="item.imgUrl" />
      <div v-bind:class="{'choosed':index==choose}">{{item.name}}</div>
    </div>
  </div>
  <!-- 项目详情 -->
  <div v-for="(item,index) in projectList" :key="index">
    <transition name="slide-fade">
      <div class="project-item" v-if="show">
        <div class="flex-item">
          <img v-if="projectType!=0" class="icon" :src="item.img"  width="120" />
          <!-- <img v-else class="icon" :src="require('~/static/mobile/index/'+item.img+'.png')"  width="120" /> -->
          <div class="name">{{item.name}}</div>
        </div>
        <div class="flex-row-between">
          <div class="gray-text">{{item.time}}</div>
          <div>去预览</div>
        </div>
        <div class="item-content">{{item.intro}}</div>
        <!-- 标签 -->
        <div>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
        </div>
      </div>
    </transition>
  </div>
  <div @click="getmore">
    <Divider orientation="center" class="text">{{ifmore?'点击更多……':"已经到底啦"}}</Divider>
  </div>
</div>
</template>
<script>
import SERVER from '~/assets/server/api.js'
export default {
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
      num: 5, //每页数量
      page: 0, //分页
      projectType: 0, //项目类型
      ifmore: false, //是否还有更多
    };
  },
  methods: {
    showThis(index) {
      [this.show, this.choose] = [!this.show, index];
      [this.projectType, this.page] = [index, 0];
      setTimeout(() => {
        this.show = !this.show;
        this.getProjectByType();
      }, 1000);
    },
    getProjectByType() {
      var params = {
        tableName: 'project',
        type: this.projectType,
        num: this.num,
        page: this.page,
      }
      SERVER.getProjectByType(params).then((data) => {
        if(data.data.length==0){
          this.ifmore=false
        }else{
          this.projectList = data.data
        }
      }).catch((err) => {

      })
    },
    getmore() {
      if (this.ifmore) {
        this.page = this.page + 1;
        this.getProjectByType(this.num, this.page);
      } else {
        return;
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
.icon {
  width: 40px;
  height: auto;
  margin-right: @distansSmall;
}

// 选中的项目颜色；
.choosed {
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
  border-bottom: @distansSmall @line-color solid;
  .flex-item {
    .flex();
    align-items: center;
  }
  .name {
    .text();
    font-weight: bold;
  }
  .item-content {
    .text();
  }
  .item-key {
    color: @red;
  }
}

// /* 可以设置不同的进入和离开动画 */

/* 设置持续时间和动画函数 */

.slide-fade-enter-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

{
  transform: translateX(10px);
  opacity: 0;
}
</style>

