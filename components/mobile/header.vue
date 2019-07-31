<template>
<div class="mobile-header">
    <!-- <img class="logo" src="https://www.baidu.com/img/bd_logo1.png"> -->
    <div class="title-name">这是头部</div>
     <ul>
      <li><nuxt-link :to="{name:'mobile-skill'}">mobile</nuxt-link></li>
      <li><nuxt-link :to="{name:'mobile-experient'}">pc</nuxt-link></li>
    </ul>
</div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.mobile-header {
    .log {
        width: 150px;
    }
}
</style>


