<template>
    <el-container>
        <el-header class="el-header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1"><el-badge is-dot hidden="true" class="item">我的好友</el-badge></el-menu-item>
                <el-menu-item index="2"><el-badge is-dot hidden="true"  class="item">我的群聊</el-badge></el-menu-item>
            </el-menu>
            <i class="el-icon-setting" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
        </el-header>
        <el-main class="el-main">
            <div v-for="friend in friendList" :key="friend.index">
                <el-card style="border-top: 0; border-left: 0; border-right: 0; position: relative;" :body-style="{ padding: '20px' }" shadow="never" >
                    <el-avatar style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%)" size="large" :src="circleUrl"></el-avatar>
                    <span style="margin-left: 50px">{{ friend.nickname }}</span>
                    <el-badge style="position: absolute; right: 10px" class="mark" :value="3" />
                </el-card>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Main",
        data () {
            return {
                friendList: [],
                activeIndex: '1'
            }
        },
        created () {
            this.friendList.push({nickname: '张三'});
            this.friendList.push({nickname: '赵四'});
            this.friendList.push({nickname: '王五'});
            this.friendList.push({nickname: '王志成'});
            this.friendList.push({nickname: '谢波'});
            this.friendList.push({nickname: '侯胜明'});
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
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin-top: 60px;
        padding: 0;
    }
</style>
