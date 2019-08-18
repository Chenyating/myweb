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
      <div class="project-item" v-if="show" >
        <div class="flex-item">
          <img class="icon" :src="item.imgUrl" width="120" />
          <div class="name">{{item.name}}</div>
        </div>
        <div class="flex-row-between">
          <div class="gray-text">{{item.time}}</div>
          <div>去预览</div>
        </div>
        <div class="item-content">{{item.content}}</div>
        <!-- 标签 -->
        <div>
          <Tag color="magenta">magenta</Tag>
          <Tag color="red">red</Tag>
          <Tag color="volcano">volcano</Tag>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      choose: 0,
      menu: [
        {
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
      projectList: [
        {
          imgUrl: require("~/static/mobile/index/fruit.png"),
          name: "第一个项目",
          content:
            "对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
          link: "www.baidu.com",
          keyword: "vuxex",
          time: "2019-12-10~2018-12-40"
        },
        {
          imgUrl: require("~/static/mobile/index/fruit.png"),
          name: "第一个项目",
          content:
            "对完成的页面进行维护和对网站前端性能做相应的优化。另外，一名合格的前端开发工程师，应该具有一定的审美能力和基础的美工操作能力，能很好的与交互及视觉协作。",
          link: "www.baidu.com",
          keyword: "vuxex",
          time: "2019-12-10~2018-12-40"
        }
      ]
    };
  },
  methods: {
    showThis(index) {
      [this.show, this.choose] = [!this.show, index];
      setTimeout(() => (this.show = !this.show), 1000);
    }
  }
};
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.icon {
  width: 40px;
  height: 40px;
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
    justify-content: center;
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

