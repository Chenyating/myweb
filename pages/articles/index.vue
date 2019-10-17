<template>
  <div class="D-big">
    <go-back routerName="/" title="文章列表"></go-back>
    <div class="article-box">
      <div class="tag-list" v-if="typeList.length>0">
        <Select class="select-box " @on-change="changeAuthor" v-model="author" style="width:200px">
          <Option v-for="(item,index) in authorList" :key="index" :value="item.key">{{ item.name }}</Option>
        </Select>
        <Select v-if="author" v-model="articleType" style="width:200px" placeholder="请选择文章类型">
          <Option v-for="(item,index) in typeList" :key="index" :value="item.articleType">{{ item.articleType }}
          </Option>
        </Select>
      </div>
      <reject v-if="blogList.length==0"></reject>
      <div v-else class="article-item" v-for="(item,index) in filterList" :key="index">
        <div @click="goArticle(item.title,item.road)" class="title"> 《{{item.title}} 》
          <Tag v-if="articleType==null" type="border" color="lime">{{item.articleType}}</Tag>
        </div>
        <div class="flex-row-between">
          <!-- 最新编辑时间 -->
          <div class="icon-time">{{item.createTime}}</div>
          <!-- 阅读次数 -->
          <div class="icon-read">{{item.readTimes}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import SERVER from '~/assets/server/api.js';
    import goBack from '~/components/mobile/back.vue';
    import reject from "~/components/mobile/reject";

    export default {
        transition: 'article',
        components: {
            goBack,
            reject
        },
        data() {
            return {
                //博客信息
                blogList: [],
                articleType:null,
                //类型列表
                typeList: [],
                tingerType: [],
                whereType: [],
                //作者
                author: 'tinger',
                authorList: [{name: 'where哥哥(✺ω✺)', key: 'where'}, {name: '婷儿(❁´ω`❁)', key: 'tinger'}]
            }
        },
        computed: {
            //过滤
            filterList: function () {
                var listType = this.articleType;
                if (listType == null) {
                    return this.blogList;
                } else {
                    var list = this.blogList.filter(item => {
                        if (item.articleType == listType) {
                            return item
                        }
                    })
                    return list;
                }
            }
        },
        methods: {
            changeAuthor(val) {
                this.articleType=null;
                if (val == 'tinger') {
                    this.getList('tinger').then(data=>{
                        this.blogList = data;
                        data.forEach(element => {
                            // 处理T型时间
                            var jsonTime = new Date(element.createTime).toJSON();
                            var time = new Date(+new Date(jsonTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                            element.createTime = time;
                        });
                        this.typeList=this.tingerType;
                    })
                } else {
                    this.getList('where').then(data=>{
                        this.blogList = data;
                        data.forEach(element => {
                            // 处理T型时间
                            var jsonTime = new Date(element.createTime).toJSON();
                            var time = new Date(+new Date(jsonTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                            element.createTime = time;
                        });
                        this.typeList=this.whereType;
                    })
                }
            },
            // 获得文章列表
            getList(whoes) {
                return new Promise((resolve, reject) => {
                    var params = {
                        whoes: whoes,
                        type: 'all'
                    };
                    SERVER.getAticleList(params).then((data) => {
                        resolve(data.data);
                    }).catch((err) => {
                        reject(err)
                        this.$Message.error("(╥╯﹏╰╥)ง请求失败，改bug去~");
                    })
                })
            },
            // 获得文章类型
            getListType(whoes) {
                return new Promise((resolve, reject) => {
                    var params = {
                        whoes: whoes,
                    };
                    SERVER.getAticleType(params).then((data) => {
                        resolve(data.data);
                    }).catch((err) => {
                        this.$Message.error("(╥╯﹏╰╥)ง请求失败，改bug去~");
                        reject(err)
                    })
                })
            },
                // 跳转去查看文章详情
            goArticle(title, road) {
                this.$router.push(`/articles/article?title=${title}`);
                sessionStorage.setItem('author',this.author);
                sessionStorage.setItem('road',road);
            }
        },
        mounted() {
            if (sessionStorage.getItem('author')==undefined){
                this.author=sessionStorage.getItem('author');
            }
            //获得类型和列表
            this.getListType('tinger').then(data => {
                this.tingerType = data;
                if (this.author=='tinger'){
                    this.typeList=this.tingerType;
                }
            });
            this.getListType('where').then(data => {
                this.whereType = data;
                if (this.author=='where'){
                    this.typeList=this.whereType;
                }
            });
            //先获得我的博客
            this.getList(this.author).then(data=>{
                this.blogList = data;
                data.forEach(element => {
                    // 处理T型时间
                    var jsonTime = new Date(element.createTime).toJSON();
                    var time = new Date(+new Date(jsonTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                    element.createTime = time;
                });
                this.typeList=this.author=='where'?this.tingerType:this.whereType;
            })
        },
    }
</script>

<style lang="less" scoped>
  @import "~assets/css/mobile/base.less";
  .select-box {
    margin-right: 10px;
  }

  .tag-list {
    .flex-row-around();
    padding-top: @distansBig;
    justify-content: flex-start;
  }

  .D-big {
    display: fixed;
    height: 100%;
    width: 100%;
    min-width: 350px;
    max-width: 1024px;
    margin: 0 auto;
    overflow: hidden;
  }

  .article-box {
    padding: 0 @distansBig;
  }

  .article-item {
    padding: @distansBig @distansSmall;
    padding-top: 0;
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
