
<template>
<div class="mavonEditor">
    <no-ssr>
        <mavon-editor :toolbars="markdownOption"
        :toolbarsFlag="false"
        :boxShadow="false"
        :ishljs="true"  :subfield="false" defaultOpen="preview" v-model="content1" />
    </no-ssr>
</div>
</template>
<script>
import SERVER from "~/assets/server/api.js";
export default {
    data() {
        return {
            title: this.$route.params.title,
            content: null,
            content1: "# ART-QR-Code",
            markdownOption: {
                bold: true // 粗体
            }
        };
    },
    methods: {
        getArticle(title) {
            var params = {
                title: title
            };
            SERVER.postAticle(params)
                .then(data => {
                    this.content1 =data.data;
                    console.log(this.content1)
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