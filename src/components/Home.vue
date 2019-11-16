<template>
    <el-container>
        <el-header class="el-header">
            <el-card style="width: 100%; height: 100%; border-radius: 0; border-right: 0; border-left: 0; border-top: 0" :body-style="{ padding: '10px' }" shadow="never">
                <div style="position: absolute; top: 50%; transform: translateX(-15%) translateY(-40%)">
                    <img src="../assets/PP-logo.png" style="width: 90px; height: 30px" alt="pp-logo"/>
                </div>
                <el-badge :hidden="!hasAdd" style="position: absolute; right: 60px; top: 50%; transform: translateY(-50%); font-size: 20px" is-dot>
                    <i @click="openAdd" class="el-icon-plus"></i>
                </el-badge>
                <i @click="openSetting" class="el-icon-setting" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
            </el-card>
        </el-header>
        <el-main class="el-main">
            <div v-for="friend in friendList" :key="friend.index">
                <el-card @click.native="clickItem(friend)"  style="border-top: 0; border-left: 0; border-right: 0; position: relative;" :body-style="{ padding: '20px' }" shadow="never">
                    <el-avatar style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%)" size="large" src="https://empty">
                        <img src="../assets/avatar/avatar1.png" alt="avatar"/>
                    </el-avatar>
                    <span style="margin-left: 50px">{{ friend.nickname }}</span>
                    <el-badge style="position: absolute; right: 10px" class="mark" :value="friend.messages.length" v-if="friend.messages.length !== 0"/>
                </el-card>
            </div>
            <div v-if="this.friendList.length === 0">
                <div style="position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); text-align: center">
                    <img src="../assets/box.png" style="width: 50px; height: 50px" alt="pp-logo"/>
                    <div style="font-size: 12px">您还没有好友</div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        props: {
            socket: Object,
            friendList: Array,
            hasAdd: Boolean
        },
        data () {
            return {
                groupList: []
            }
        },
        created () {
            this.socket.onmessage = this.getMessage;
            this.socket.onopen = this.open;
            this.socket.onclose = this.close;
            this.socket.onerror = this.error;
        },
        methods: {
            openAdd () {
                this.$emit('switchView', {chatShow: false, homeShow: false, addShow: true, settingShow: false});
            },
            openSetting () {
                this.$emit('switchView', {chatShow: false, homeShow: false, addShow: false, settingShow: true});
            },
            clickItem (friend) {
                // eslint-disable-next-line no-console
                console.log('click');
                this.$emit('setFriend', { ppid: friend.ppid, nickname: friend.nickname, messages: friend.messages});
                this.$emit('switchView', {chatShow: true, homeShow: false, addShow: false, settingShow: false});
            },
            getMessage (msg) {
                let result = JSON.parse(msg.data);
                if(result.ppid !== undefined){
                    this.$emit('addToFriendList', result);
                }else if(result.verifyString !== undefined){
                    this.$emit('addToConfirmList', result);
                }else{
                    for(let i = 0; i < this.friendList.length; i++){
                        if(this.friendList[i].ppid === result.from){
                            this.friendList[i].messages.push(result);
                        }
                    }
                }
            },
            open () {
            },
            close () {
            },
            error () {
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
        z-index: 2;
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
