<template>
<div>
    <!-- 先输入昵称 -->
    <div class="before" v-if="!ifEnter">
        <Input @on-search="settingName()" v-model="userName" :value="userName" search enter-button="确定" placeholder="请输入您的昵称" />
    </div>
    <!-- 开始群聊 -->
    <div class="after" v-else>
        <div class="left">
            <!-- 聊天内容 -->
            <div class="content" id="content">
                <div v-for="(item,index) in messageList" :key="index">
                    <!-- 加入群聊 -->
                    <div class="notice" v-if="item.type=='addUser'">
                        <h2>{{item.user}}加入群聊</h2>
                    </div>
                    <!-- 退出群聊 -->
                    <div class="notice" v-if="item.type=='quit'">
                        <div>{{item.user}}退出群聊</div>
                    </div>
                    <!-- 收到消息 -->
                    <div :class="{'myMessage':item.userId==userId}" v-if="item.type=='message'">
                        <div>{{item.user}}:{{item.time}}</div>
                        <h3 class="message">{{item.content}}</h3>
                    </div>
                </div>
            </div>
            <!-- 编辑栏 -->
            <div>
                <Input v-model="text" show-word-limit type="textarea" placeholder="Enter something..." style="width: 200px" />
                <Button type="info" @click="send()">发送</Button>
                <Button type="error" @click="quit()">退出</Button>
            </div>
        </div>
        <!-- 用户信息 -->
        <div class="right">
            <h1>《用户列表》</h1>
            <div v-for="(item,index) in users" :key="index" :class="{'isMe':item.userId==userId}">{{item.userName}}( {{item.userId}} )</div>
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
            userId: '',
            text: '大家好 丫~我是婷婷儿', //内容
            ws: null, //wbs
            message: { //发送的消息格式
                type: '', //发送类型
                user: '',
                userId: '',
                toUser: '', //消息接收方名
                toUser: '', //消息接收方id
                content: '', //发送内容
                time: '' //发送时间
            }
        }
    },
    methods: {
        // 退出聊天室
        quit() {
            this.message.type = 'quit';
            this.message.content = this.text;
            this.ws.onopen();
            this.ws.close();
            this.ifEnter = false;

        },
        // 设置昵称
        settingName() {
            this.ifEnter = true;
            this.userId = new Date().getTime();
            this.message.type = 'addUser';
            this.message.user = this.userName;
            this.message.userId = this.userId;
            this.message.time = new Date().toLocaleString()
            this.initWbs();
        },
        // wbs初始化；
        initWbs() {
            this.ws = new WebSocket(`ws://172.28.194.52:8080/chat?userId=${this.message.userId}&userName=${this.userName}`);
            // 设置属性
            // 连接时
            this.ws.onopen = (e) => {
                var sendMessage = JSON.stringify(this.message);
                this.ws.send(sendMessage)
            };
            // 收到信息时
            this.ws.onmessage = (e) => {
                var recieve = JSON.parse(e.data);
                switch (recieve.type) {
                    // 首次连接会发送所有用户信息
                    case 'allUser':
                        this.users = recieve.userList;
                        break;
                        // 添加用户
                    case 'addUser':
                        break;
                        // 退出消息
                    case 'quit':
                        // 获得退出用户信息，从列表中去掉；
                        this.users = this.users.filter((element, index) => {
                            if (recieve.userId != element.userId) {
                                return element;
                            }
                        })
                        break;
                        // 普通消息
                }
                if (recieve.type != 'allUser') {
                    this.messageList.push(recieve);
                    // ue中数据和dom渲染由于是异步的，所以，要让dom结构随数据改变这样的操作都应该放进this.$nextTick()的回调函数中。
                    this.$nextTick(() => {
                        var ele = document.getElementById('content');
                        ele.scrollTop = ele.scrollHeight - ele.clientHeight;
                    })
                }
            };
            // 退出时
            this.ws.onclose = () => {
                this.users = [];
                console.log(this.users)
                this.messageList = [];
                console.log("你已经退出聊天室了!!");
            };
        },
        send() {
            this.message.type = 'message';
            this.message.content = this.text;
            this.ws.onopen();
        }
    },
    beforeDestroy() {
        this.ws.close();
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
            overflow: scroll;
            overflow-x: hidden;
            padding: 0 20px;
            .notice {
                text-align: center;
            }
            .myMessage {
                text-align: right;
            }
            .message {
                border: solid 2px black;
                display: inline-block;
            }
        }
    }
    .right {
        width: 200px;
        height: inherit;
        border: solid 1px blue;
        .isMe{
            color: red;
        }
    }
}
</style>