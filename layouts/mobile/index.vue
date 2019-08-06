<template>
<div>
    <Header></Header>
    <nuxt/>
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

