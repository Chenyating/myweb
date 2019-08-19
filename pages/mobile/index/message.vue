<template>
<div>
    <!-- 留言输入框 -->
    <Form class="input-box" ref="messageForm" :model="messageForm" :rules="messageRule" inline :label-width="100">
        <FormItem class='input-fill' prop="name" label="你的姓名：">
            <Input type="text" v-model="messageForm.name" placeholder="请输入你的大名~" />
        </FormItem>
        <FormItem class='input-fill' prop="content" label="给我的留言：">
            <Input type="textarea" v-model="messageForm.content" placeholder="等你好久，快跟我说话~" />
        </FormItem>
        <Button class="input-btn" type="primary" @click="takeMessage('messageForm')">提交</Button>
    </Form>
    <!-- 留言列表 -->
    <Divider orientation="left">留言列表</Divider>
    <Card class="message-card" v-for="(item,index) in messageList" :key="index">
        <div slot="extra">回复</div>
        <div class="flex">
            <Avatar shape="square" src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
            <div class="message-info">
                <div class="text-bold">{{item.name}}</div>
                <div class="gray-text">{{item.createTime.replace('T',"  ").replace('.000Z',"  ")}}</div>
            </div>
        </div>
        <div class="text">
            <div>{{item.content}}</div>
            <div v-if="item.returnContent"><em class="em-blue">楼主回复：</em>{{item.returnTime}}</div>
            <div v-if="item.returnContent">{{item.returnContent}}</div>
        </div>
    </Card>
</div>
</template>
<script>
import SERVER from '~/assets/server/api.js'
export default {
    data() {
        return {
            // 留言列表
            messageList: null,
            // 表单信息
            messageForm: {
                name: '',
                content: ''
            },
            // 留言填入规则
            messageRule: {
                name: [{
                        required: true,
                        message: '歪！你的名字捏？',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        max: 10,
                        message: '你的名字有介么长的吗？',
                        trigger: 'blur'
                    },
                ],
                content: [{
                        required: true,
                        message: '对我说的话捏？',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 5,
                        message: '字数有点儿少啊￣へ￣',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        max: 100,
                        message: '字数有点略多啊￣へ￣',
                        trigger: 'blur'
                    },
                ]
            }
        }
    },
    methods: {
        // 提交留言
        takeMessage(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    SERVER.postMessage(this.messageForm).then((data)=>{
                        if(data.data.code==1){
                            this.$Message.info(data.data.info);
                            this.messageList.unshift(this.messageForm);
                        }else{
                            this.$Message.info(data.data.info);
                        }
                        // this.getMessageList();
                    }).catch((err)=>{
                        this.$Message.error(err);
                    })
                } else {
                    this.$Message.error('居然没有填东西就想提交||!');
                }
            })
        },
        // 获得留言列表
        getMessageList(){
            SERVER.getMessageList().then((data)=>{
                this.messageList=data.data;
            }).catch((err)=>{
               this.$Message.error(err);
            })
        }
    },
    mounted(){
        this.getMessageList();
    }
}
</script>
<style lang="less" scoped>
@import "~assets/css/mobile/base.less";
// 输入框
.input-box {
    padding: @distansBig;
    .input-fill {
        width: 100%;
    }
    .input-btn {
        float: right;
    }
}

// 留言信息卡
.message-card {
    margin: @distansBig;
    .border-shadow();
    .message-info {
        margin-left: @distansBig;
    }
}
</style>