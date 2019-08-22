
<template>
<div>
    <go-back ></go-back>
    <div v-if="ifhas" class="mavonEditor">
        <mavon-editor :toolbars="markdownOption" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" :subfield="false" defaultOpen="preview" v-model="content" />
    </div>
    <div class="article-item">225</div>
</div>
</template>
<script>
import SERVER from "~/assets/server/api.js";
import goBack from "~/components/mobile/back.vue";
export default {
    components:{
        goBack
    },
    data() {
        return {
            // 标题
            title: this.$route.query.title,
            content: "#haha",//内容
            markdownOption: {
                bold: true // 粗体
            },
            ifhas:false,
        };
    },
    methods: {
        // 获得文字内容
        getArticle(title) {
            var params = {
                title: title
            };
            SERVER.postAticle(params)
                .then(data => {
                    if(data.data.code==1){
                        this.content =JSON.parse(data.data.content);
                        this.ifhas=true;
                    }else{
                        this.content =data.data.content;
                    }
                })
                .catch();
        }
    },
    mounted() {
        console.log("???")
        this.title=this.$route.query.title;
        this.getArticle(this.title);
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
.mavonEditor {
    width: 100%;
    height: 100%;
}
.mavon-editor{
    background: white;

}
.article-item {
  // x方向重复背景
  background: url("~static/mobile/icon/hua.png");
  background-position: bottom;
//   background-repeat: repeat-x;
height: 80px;
}
</style>