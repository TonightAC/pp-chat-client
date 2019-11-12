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
            <el-card v-loading="loading" style="position: absolute; bottom: 10px; left: 10px; right: 10px; top: 0; margin-top: 60px" shadow="never">
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "Add",
        data () {
            return {
                searchString: '',
                loading: false
            }
        },
        methods: {
            search () {
                this.loading = true;
                this.axios.get('/user/search?searchString=' + this.searchString).then(res => {
                    this.loading = false;
                    if(res.data.code === '0000'){
                        if(res.data.data.length === 0){
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
                    this.loading = false;
                    Toast({
                        message: '网络异常',
                        position: 'bottom',
                        duration: 2000
                    });
                    // eslint-disable-next-line no-console
                    console.log(error);
                })
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
