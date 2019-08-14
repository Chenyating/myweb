<template>
<div class="footer">
    粤ICP备案号：18150247号 你是第{{num}}个访问的人
</div>
</template>
<script>
export default {
    data() {
        return {
            num: 1
        }
    }
}
</script>
<style lang="less" scoped>
.footer {
    bottom: 0;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 5px;
}
</style>
