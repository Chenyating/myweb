<template>
<div class="footer">
    粤ICP备案号：18150247号 你是{{num?'第'+num+'个访问的人':"x->0,|x|/x极限的人吗？"}}
</div>
</template>
<script>
export default {
    props: {
        // 校验父组件传入子组件的值
        num: {
            type: String,
            default: "n"
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
