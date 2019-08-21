<template>
<div>
    <nuxt-link to="/mobile">返回</nuxt-link>
    <div v-for="(item,index) in blogList" :key="index">
        <Card class="card-box">
            <div class="title">{{item[0]}}</div>
            <div class="gray-text">{{item[1].replace('T'," ").replace('Z'," ")}}</div>
        </Card>
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
        getList() {
            SERVER.getAticleList().then((data) => {
                console.log(data);
                this.blogList=data.data;
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.getList();
    }
}
</script>
<style lang="less">
@import "~assets/css/mobile/base.less";
.card-box {
    margin: @distansBig;
    padding: @distansBig;
    .border-shadow();
}
</style>
