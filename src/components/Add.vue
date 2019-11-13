<template>
    <el-container>
        <el-header class="el-header">
            <el-card style="width: 100%; height: 100%; border-radius: 0" :body-style="{ padding: '10px' }" shadow="never">
                <i @click="back" class="el-icon-arrow-left" style="position: absolute; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
                <div style="font-size: 16px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">添加</div>
            </el-card>
        </el-header>
        <el-main class="el-main">
            <el-row>
                <el-col style="padding-right: 3px" :span="18"><el-input v-model="searchString" placeholder="PP号/昵称"></el-input></el-col>
                <el-col style="padding-left: 3px" :span="6"><el-button style="width: 100%;" @click="search" type="primary">搜索</el-button></el-col>
            </el-row>
            <div v-for="item in searchList" :key="item.index">
                <el-card style="border-top: 0; border-left: 0; border-right: 0; position: relative;" :body-style="{ padding: '20px' }" shadow="never">
                    <el-avatar style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%)" size="large" src="https://empty">
                        <img src="../assets/avatar/avatar1.png" alt="avatar"/>
                    </el-avatar>
                    <div style="margin-left: 45px">{{ item.nickname }}</div>
                    <div style="margin-left: 45px; font-size: 12px">{{ item.ppid }}</div>
                    <i @click="clickItem(item)" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 20px" class="el-icon-circle-plus-outline"></i>
                </el-card>
            </div>
        </el-main>
        <el-dialog :visible.sync="dialogVisible" width="75%">
            <h4>请输入添加验证信息：</h4>
            <el-input v-model="verifyMessage" placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="add">添加</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "Add",
        data () {
            return {
                verifyMessage: '',
                searchString: '',
                item: null,
                searchList: [],
                dialogVisible: false
            }
        },
        methods: {
            search () {
                if(this.searchString.length !== 0){
                    this.axios.get('/user/search?searchString=' + this.searchString).then(res => {
                        this.searchList.length = 0;
                        if(res.data.code === '0000'){
                            if(res.data.data.length !== 0){
                                for (let i = 0; i < res.data.data.length; i++){
                                    this.searchList.push({
                                        uid: res.data.data[i].uid,
                                        ppid: res.data.data[i].ppid,
                                        nickname: res.data.data[i].nickname
                                    });
                                }
                            }else {
                                Toast({
                                    message: '查无结果',
                                    position: 'bottom',
                                    duration: 2000
                                });
                            }
                        } else {
                            Toast({
                                message: '查询失败',
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
                }else{
                    Toast({
                        message: '搜索不能为空',
                        position: 'bottom',
                        duration: 2000
                    });
                }
            },
            add () {
                this.dialogVisible = false;
                this.axios.post('/user/add?ppid=' + this.item.ppid + '&uid1=' + this.item.uid + '&uid2=' + sessionStorage.getItem('uid') + '&verifyMessage=' + this.verifyMessage).then(res => {
                    this.searchList.length = 0;
                    if(res.data.code === '0000'){
                        Toast({
                            message: '添加成功，等待对方确认',
                            position: 'bottom',
                            duration: 2000
                        });
                    } else {
                        Toast({
                            message: '添加失败',
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
            },
            clickItem (item) {
                this.dialogVisible = true;
                this.item = item;
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
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 10px;
    }
</style>
