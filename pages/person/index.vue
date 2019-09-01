<template>
<div>
    <Modal v-model="loginBox" :closable="false" :mask-closable="false">
        <p slot="header" style="color:#19be6b;text-align:center">
            <Icon type="md-boat" />
            <span>LOGIN MY WORLD</span>
        </p>
        <Form ref="userInfo" :model="userInfo" :rules="userInfoRule">
            <FormItem prop="user">
                <Input type="text" v-model="userInfo.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="userInfo.password" placeholder="密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button type="success" ghost size="large" long  @click="handleSubmit('userInfo')">登录</Button>
        </div>
    </Modal>
    <!-- 个人中心菜单 -->
    <div>
        <div></div>
    </div>
</div>
</template>

<script>
import SERVER from "~/assets/server/api.js";

export default {
    layout: "mobile/index",
    data() {
        return {
            loginBox: true,
            userInfo: {
                user: '',
                password: ''
            },
            userInfoRule: {
                user: [{
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                }],
                password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 6,
                        message: '我就知道你是猜的输入密码',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    SERVER.login(this.userInfo).then(data => {
                        console.log(data);
                        this.$Message.success('Success!');
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
            this.loginBox = true;
        }
    }
};
</script>

<style lang="less" scoped>
@import "~assets/css/mobile/base.less";

</style>
