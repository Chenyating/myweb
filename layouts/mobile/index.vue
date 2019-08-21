<template>
<div>
    <Header></Header>
    <nuxt/>
    <Footer :num="times"></Footer>
</div>
</template>
<script>
import SERVER from '~/assets/server/api.js'
import Header from '~/components/mobile/header';
import Footer from '~/components/mobile/footer'
export default {
    components:{
        Header,
        Footer
    },
    data(){
        return{
            times:null
        }
    },
    mounted(){
        var params={
            name:"mobileIndex"
        }
        SERVER.addTimes(params).then((data)=>{
            // console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
        SERVER.getTimes(params).then((data)=>{
            this.times=data.data[0].times;
            console.log(this.times)
        }).catch((err)=>{
            console.log(err)
        })
    }
}
</script>

