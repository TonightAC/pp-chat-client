<template>
    <el-main style="position: absolute; top: 0; bottom: 0; left: 0; right: 0">
        <div style="width: 300px; position: absolute; left: 50%; top: 20%; transform: translateX(-50%) translateY(-20%)">
            <img src="../assets/PP-logo.png" style="width: 300px; height: 100px" alt="pp-logo"/>
        </div>
        <div style="width: 260px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">
            <el-input v-model="ppid" placeholder="请输入PP号码"></el-input>
            <el-input style="margin-top: 13px" v-model="pwd" placeholder="请输入密码" show-password></el-input>
            <div style="margin-left: 25px; margin-top: 13px; width: 250px">
                <el-button style="width: 100px" @click="signUp" plain>注册</el-button>
                <el-button style="width: 100px;" @click="login" type="primary" plain>登陆</el-button>
            </div>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                ppid: '',
                pwd: ''
            }
        },
        methods: {
            login () {
            },
            signUp () {
            }
        }
    }
</script>

<style scoped>

</style>
