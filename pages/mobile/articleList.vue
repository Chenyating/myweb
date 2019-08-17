<template>
<div>
    <nuxt-link to="/mobile">返回</nuxt-link>
    <div v-for="(item,index) in blogList" :key="index">
        <Card class="card-box">
            <div class="title">{{item.title}}</div>
            <div class="gray-text">{{item.date}}</div>
        </Card>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            blogList: [{
                    title: '这是博客的名称',
                    date: '2019-10-12 18:50',
                },
                {
                    title: '这是博客的名称',
                    date: '2019-10-12 18:50',
                },
                {
                    title: '这是博客的名称',
                    date: '2019-10-12 18:50',
                },
                {
                    title: '这是博客的名称',
                    date: '2019-10-12 18:50',
                },
            ]
        }
    },
    methods: {
        getList() {}
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
