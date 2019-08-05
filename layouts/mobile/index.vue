<template>
<div>
    <Header></Header>
    <nuxt class="content"/>
    <Footer></Footer>
</div>
</template>
<script>
import Header from '~/components/mobile/header';
import Footer from '~/components/mobile/footer'
export default {
    components:{
        Header,
        Footer
    }
}
</script>
<style lang="less" scoped>
.content{
    margin-bottom: 20px;
}
</style>

