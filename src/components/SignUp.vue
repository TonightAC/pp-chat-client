<template>
    <el-main style="position: absolute; top: 0; bottom: 0; left: 0; right: 0">
        <div style="width: 300px; position: absolute; left: 50%; top: 20%; transform: translateX(-50%) translateY(-20%)">
            <img src="../assets/PP-logo.png" style="width: 300px; height: 100px" alt="pp-logo"/>
        </div>
        <div style="width: 260px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">
            <el-input v-model="nickname" placeholder="请输入昵称"></el-input>
            <el-input style="margin-top: 13px" v-model="pwd" placeholder="请输入密码" show-password></el-input>
            <div style="margin-left: 30px; margin-top: 13px; width: 250px">
                <el-button style="width: 200px" @click="signUp" type="primary" plain>注册</el-button>
            </div>
        </div>
        <el-dialog style="position: relative; top: 10%;" :visible.sync="dialogVisible" width="75%">
            <h4>请记住您的PP号码，</h4>
            <h4>下次登录时使用。</h4>
            <h2 style="text-align: center; padding-top: 20px">{{ this.ppid }}</h2>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmPpid">确定</el-button>
            </span>
        </el-dialog>
    </el-main>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "SignUp",
        data () {
            return {
                ppid: '',
                nickname: '',
                pwd: '',
                dialogVisible: false
            }
        },
        methods: {
            confirmPpid () {
                this.dialogVisible = false;
                sessionStorage.setItem('token', 'true');
                this.$router.push({ name : 'Main' });
            },
            signUp () {
                this.axios.post('/user/signUp?nickname=' + this.nickname + '&pwd=' + this.pwd).then(res => {
                    if(res.data.code === '0000'){
                        sessionStorage.setItem('uid', res.data.data.uid);
                        sessionStorage.setItem('ppid', res.data.data.ppid);
                        sessionStorage.setItem('nickname', res.data.data.nickname);
                        this.ppid = res.data.data.ppid;
                        Toast({
                            message: '注册成功',
                            position: 'bottom',
                            duration: 2000
                        });
                        this.dialogVisible = true;
                    } else {
                        Toast({
                            message: '注册失败',
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                }).catch(error => {
                    Toast({
                        message: '网络异常',
                        position: 'bottom',
                        duration: 2000
                    });
                    // eslint-disable-next-line no-console
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>
