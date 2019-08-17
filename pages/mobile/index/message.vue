<template>
<div>
    <!-- 留言输入框 -->
    <Form class="input-box" ref="messageForm" :model="messageForm" :rules="messageRule" inline :label-width="100">
        <FormItem class='input-fill' prop="name" label="你的姓名：">
            <Input type="text" v-model="messageForm.name" placeholder="请输入你的大名~" />
        </FormItem>
        <FormItem class='input-fill' prop="message" label="给我的留言：">
            <Input type="textarea" v-model="messageForm.message" placeholder="等你好久，快跟我说话~" />
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
                <div class="gray-text">{{item.time}}</div>
            </div>
        </div>
        <div class="text">
            <div>{{item.content}}</div>
            <div v-if="item.return"><em>楼主回复：</em>{{item.return}}</div>
        </div>
    </Card>
</div>
</template>
<script>
export default {
    data() {
        return {
            // 留言列表
            messageList: [{
                    name: "yating",
                    time: '2019-10-1 10:25:56',
                    content: "感觉还不错，继续努力哦~",
                },
                {
                    name: "yating",
                    time: '2019-10-1 10:25:56',
                    content: "感觉还不错，继续努力哦~",
                    return: "谢谢，我也觉得不错，哈哈哈哈~"
                },
                {
                    name: "yating",
                    time: '2019-10-1 10:25:56',
                    content: "感觉还不错，继续努力哦~",
                    return: "谢谢，我也觉得不错，哈哈哈哈~"
                },

            ],
            // 表单信息
            messageForm: {
                name: '',
                message: ''
            },
            messageRule: {
                name: [{
                    required: true,
                    message: '歪！你的名字捏？',
                    trigger: 'blur'
                }],
                message: [{
                        required: true,
                        message: '对我说的话捏？',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 6,
                        message: '字数有点儿少啊￣へ￣',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        takeMessage(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
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