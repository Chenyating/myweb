<template>
<div class="D-show">
    <back routerName="/projectList"></back>
    <nuxt/>
</div>
</template>

<script>
import back from "~/components/mobile/back";
export default {
    components: {
        back
    }

}
</script>
<style lang="less" scoped>
.D-show {
    display: fixed;
    height: 100%;
    width: 100%;
    min-width: 350px;
    max-width: 1024px;
    margin: 0 auto;
    overflow: hidden;
}
</style>