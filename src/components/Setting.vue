<template>
    <el-container>
        <el-header class="el-header">
            <el-card style="width: 100%; height: 100%; border-radius: 0" shadow="never">
                <i @click="back" class="el-icon-arrow-left" style="position: absolute; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
                <div style="font-size: 16px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">设置</div>
            </el-card>
        </el-header>
        <el-main class="el-main">
        </el-main>
        <el-footer class="el-footer">
            <el-button @click="logOut" style="width: 100%" type="info" plain>退出登录</el-button>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Setting",
        methods: {
            logOut () {
                sessionStorage.setItem('token', 'false');
                this.$router.push({ name : 'Login' });
            },
            back () {
                this.$emit('switchView', {chatShow: false, homeShow: true, addShow: false, settingShow: false});
            }
        }
    }
</script>

<style scoped>
    .el-header {
        position: absolute;
        padding: 0;
        left: 0;
        right: 0;
        top: 0;
    }
    .el-main {
        margin-top: 60px;
        margin-bottom: 60px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .el-footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px;
    }
</style>
