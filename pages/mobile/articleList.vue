<template>
<div class="article-box">
  <nuxt-link to="/mobile">返回</nuxt-link>
  <div class="article-item" v-for="(item,index) in blogList" :key="index">
    <div @click="goArticle(item[0])" class="title"> 《 {{item[0]}} 》</div>
    <div class="flex-row-between">
      <div class="icon-time">{{item[1]}}</div>
      <div class="icon-read">10</div>
    </div>
  </div>
</div>
</template>
<script>
import SERVER from '~/assets/server/api.js'
export default {
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
      }).catch((err) => {
      })
    },
    goArticle(title) {
      // 跳转去查看文章详情
      this.$router.push(`/mobile/article?title=${title}`);
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
  padding: @distansBig;
}
.article-item{
  padding:@distansSmall;
  margin:@distansBig @distansSmall;
  border-bottom: @line-sizeSmall dotted @orange;
}

// 伪类图标
.icon-time {
  line-height: @distansBig;
  &:before {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    margin-right: @distansSmall;
    .icon(@width:15px);
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
    .icon(@width:15px);
    background: url(@img-read) no-repeat;
    background-size: 100%;
  }
}
</style>
