
<template>
<div class="mavonEditor">
    <no-ssr>
        <mavon-editor :toolbars="markdownOption" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" :subfield="false" defaultOpen="preview" v-model="content" />
    </no-ssr>
</div>
</template>
<script>
import SERVER from "~/assets/server/api.js";
export default {
    data() {
        return {
            // 标题
            title: this.$route.query.title,
            content: "",//内容
            markdownOption: {
                bold: true // 粗体
            }
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
                    }else{
                        this.content =data.data.content;
                    }
                })
                .catch();
        }
    },
    mounted() {
        this.getArticle(this.title);
    }
};
</script>

<style scoped>
.mavonEditor {
    width: 100%;
    height: 100%;
}
</style>