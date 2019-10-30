<template>
<div>
    <div class="before" v-if="!ifEnter">
        <div>
            <Input @on-search="settingName(userName)" v-model="userName" :value="userName" search enter-button="确定" placeholder="请输入您的昵称" />
        </div>
    </div>
    <div class="after" v-else>
        <div class="left">
            <div class="content">
                <div v-for="(item,index) in messageList" :key="index">
                    <div>{{item.user}}:{{item.time}}</div>
                    <h3>{{item.content}}</h3>
                </div>
            </div>
            <div>
                <Input v-model="text" show-word-limit type="textarea" placeholder="Enter something..." style="width: 200px" />
                <Button type="info" @click="send()">发送</Button>
                <Button type="error" @click="quit()">退出</Button>
            </div>
        </div>
        <div class="right">
            <div v-for="(item,index) in users" :key="index">{{item}}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            messageList: [], //所有消息列表
            users: [], //用户列表
            ifEnter: false, //是否聊天状态
            userName: '游客',
            text: 1, //内容
            ws: null, //wbs
            message: { //发送的消息格式
                type: '', //发送类型
                user: '',
                content: '', //发送内容
                time: '' //发送时间
            }
        }
    },
    methods: {
        // 退出聊天室
        quit() {
            this.ws.close();
            this.ifEnter = false;

        },
        // 设置昵称
        settingName(userName) {
            this.ifEnter = true;
            this.users.push(userName)
            this.message = {
                type: 'addUser',
                user: userName,
                content: '',
                time: new Date().toTimeString()
            }
            this.initWbs();
        },
        // wbs初始化；
        initWbs() {
            this.ws = new WebSocket('ws://localhost:8080');
            // 设置属性
            // 连接时
            this.ws.onopen = (type) => {
                if (type == 1) {
                    console.log("发送内容")
                } else {
                    // 这就是普通的登录
                    var sendMessage = JSON.stringify(this.message);
                    this.ws.send(sendMessage);
                }
            };
            // 收到信息时
            this.ws.onmessage = (e) => {
                var recieve = JSON.parse(e.data);
                this.messageList.push(recieve)
            };
            this.ws.onerror = () => {
                console.log("报错")
            }
            // 退出时
            this.ws.onclose = () => {
                alert("你已经退出聊天室了")
                console.log("退出")
            };
        },
        send() {
            this.text++;
            this.ws.onopen(1);
        }
    },
    mounted() {}
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