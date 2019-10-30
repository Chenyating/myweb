<template>
<div>
    <div class="before">
        <div>
            <Input @on-search="settingName()" v-model="userName" :value="userName" search enter-button="确定" placeholder="请输入您的昵称" />
        </div>
    </div>
    <div class="after">
        <div class="left">
            <div class="content">
                <div v-for="(item,index) in message" :key="index">
                    <div></div>
                    <div>{{item}}</div>
                </div>
            </div>
            <Input @on-search="haha()" :value="text" search enter-button="发送" placeholder="请输入内容" />
        </div>
        <div class="right">
            <div v-for="(item,index) in users" :key="index">{{item}}</div>
        </div>
    </div>
    <div>退出</div>
</div>
</template>
<script>
export default {
    data() {
        return {
            message: [], //聊天记录
            users: ['我'], //用户列表
            userName: '',
            text: 1, //内容
            ws: null, //wbs
        }
    },
    methods: {
        // 设置昵称
        settingName(){},
        // wbs初始化；
        initWbs() {
            this.ws = new WebSocket('ws://localhost:8080');
            // 设置属性
            // 收到信息时
            this.ws.onmessage = (e) => {
                console.log('收到内容: ' + e.data);
                var data=JSON.stringify(e.data);
                console.log(data,"??")
                // this.message.push(e.data)
            };
            // 连接时
            this.ws.onopen = () => {
                if(this.message.length>0){
                    console.log('发送内容：', this.text);
                    this.ws.send(this.text);
                }else{
                    console.log('发送内容：', this.text);
                    this.ws.send(this.text);
                }
            };
            // 退出时
            this.ws.onclose = () => {
                console.log("退出")
            };
        },
        haha() {
            this.text++;
            this.ws.onopen();
        }
    },
    mounted() {
        this.initWbs();
    }
}
</script>
<style lang="less" scoped>
.before {}

.after {
    display: flex;
    .left {
        .content {
            width: 500px;
            height: 300px;
            border: solid 1px red;
            overflow: auto;
        }
    }
    .right {
        width: 200px;
        height: inherit;
        border: solid 1px blue;
    }
}
</style>