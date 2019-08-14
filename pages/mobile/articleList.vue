<template>
<div>
    <nuxt-link to="/">首页</nuxt-link>
    这是列表
</div>
</template>
<script>
export default {
    methods: {
        getList() {
        }
    },
    mounted() {
        this.getList();
    }
}
</script>
<style lang="less" scoped>

</style>
