<template>
    <el-container>
        <el-header class="el-header">
            <el-card style="width: 100%; height: 100%; border-radius: 0" :body-style="{ padding: '10px' }" shadow="never">
                <i @click="back" class="el-icon-arrow-left" style="position: absolute; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
                <div style="font-size: 16px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">设置</div>
            </el-card>
        </el-header>
        <el-main class="el-main">
            <el-card class="el-card" :body-style="{ padding: '0' }" shadow="never">
                <el-avatar style="width: 50px; height: 50px; position: absolute; left: 15px; top: 50%; transform: translateY(-50%)" src="https://empty">
                    <img src="../assets/avatar/avatar1.png" alt="avatar"/>
                </el-avatar>
                <div style="position: absolute; left: 80px; top: 20px">{{ this.nickname }}</div>
                <div style="position: absolute; left: 80px; top: 45px; font-size: 12px">{{ this.ppid }}</div>
            </el-card>
            <el-collapse accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <div style="margin-left: 15px">修改头像</div>
                    </template>
                    <div>
                        <el-row>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                            <el-col :span="6"><el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image></el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <div style="margin-left: 15px">修改昵称</div>
                    </template>
                    <div style="padding: 0 10px 0 10px">
                        <el-input v-model="modifyNickname" placeholder="请输入修改昵称"></el-input>
                        <el-button type="primary" style="width: 100%; margin-top: 5px" plain>修改</el-button>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <div style="margin-left: 15px">修改密码</div>
                    </template>
                    <div style="padding: 0 10px 0 10px">
                        <el-input v-model="modifyPwd" placeholder="请输入修改密码" show-password></el-input>
                        <el-button type="primary" style="width: 100%; margin-top: 5px" plain>修改</el-button>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-main>
        <el-footer class="el-footer">
            <el-button @click="logOut" style="width: 100%" type="info" plain>退出登录</el-button>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Setting",
        data () {
            return {
                ppid: '',
                nickname: '',
                modifyNickname: '',
                modifyPwd: ''
            }
        },
        created () {
            this.ppid = sessionStorage.getItem('ppid');
            this.nickname = sessionStorage.getItem('nickname');
        },
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
        padding: 0;
    }
    .el-footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px;
    }
    .el-card {
        position: relative;
        border-bottom: 0;
        border-left: 0;
        border-right: 0;
        height: 80px;
    }
</style>
