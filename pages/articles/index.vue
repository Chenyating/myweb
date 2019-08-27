<template>
<div class="D-big">
  <go-back routerName="/" title="文章列表"></go-back>
  <div class="article-box">
    <div class="article-item" v-for="(item,index) in blogList" :key="index">
      <div @click="goArticle(item[0])" class="title"> 《 {{item[0]}} 》</div>
      <div class="flex-row-between">
        <!-- 最新编辑时间 -->
        <div class="icon-time">{{item[1]}}</div>
        <!-- 阅读次数 -->
        <div class="icon-read">10</div>
      </div>
    </div>
  </div>
  <div class="border-bottom"></div>
</div>
</template>
<script>
import SERVER from '~/assets/server/api.js'
import goBack from '~/components/mobile/back.vue'
export default {
  transition: 'article',
  components: {
    goBack,
  },
  data() {
    return {
      blogList: null
    }
  },
  methods: {
    // 获得文章列表
    getList() {
      SERVER.getAticleList().then((data) => {
        this.blogList = data.data;
        data.data.forEach(element => {

          // 处理T型时间
          var jsonTime = new Date(element[1]).toJSON();
          var time = new Date(+new Date(jsonTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          element[1] = time;
        });
      }).catch((err) => {})
    },
    goArticle(title) {
      // 跳转去查看文章详情
      this.$router.push(`/articles/article?title=${title}`);
    }
  },
  mounted() {
    this.getList();
  }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.article-box {
  padding: 0 @distansBig;
}

.article-item {
  padding: @distansBig @distansSmall;
  margin: @distansBig; // x方向重复背景
  background-image: url("~static/mobile/icon/cao.png");
  background-position: bottom;
  background-repeat: repeat-x;
}

// 伪类图标
.icon-time {
  line-height: @distansBig;
  &:before {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    margin-right: @distansSmall;
    .icon(@width: 15px);
    background: url(@img-time) no-repeat;
    background-size: 100%;
  }
}

.icon-read {
  line-height: @distansBig;
  &:before {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    margin-right: @distansSmall;
    .icon(@width: 15px);
    background: url(@img-read) no-repeat;
    background-size: 100%;
  }
}
</style>
