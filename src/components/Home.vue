<template>
    <el-container>
        <el-header class="el-header">
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1" @click="switchFriends"><el-badge is-dot hidden="true" class="item">我的好友</el-badge></el-menu-item>
                <el-menu-item index="2" @click="switchGroups"><el-badge is-dot hidden="true"  class="item">我的群聊</el-badge></el-menu-item>
            </el-menu>
            <i @click="openSetting" class="el-icon-setting" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
        </el-header>
        <el-main class="el-main">
            <div v-if="switchFlag">
                <div v-for="friend in friendList" :key="friend.index">
                    <el-card @click.native="clickItem(friend)"  style="border-top: 0; border-left: 0; border-right: 0; position: relative;" :body-style="{ padding: '20px' }" shadow="never" >
                        <el-avatar style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%)" size="large" :src="circleUrl"></el-avatar>
                        <span style="margin-left: 50px">{{ friend.nickname }}</span>
                        <el-badge style="position: absolute; right: 10px" class="mark" :value="friend.messages.length" v-if="friend.messages.length !== 0"/>
                    </el-card>
                </div>
            </div>
            <div v-else>
                <div v-for="group in groupList" :key="group.index">
                    <el-card @click.native="clickItem(group.ppid, group.nickname)"  style="border-top: 0; border-left: 0; border-right: 0; position: relative;" :body-style="{ padding: '20px' }" shadow="never" >
                        <el-avatar style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%)" size="large" :src="circleUrl"></el-avatar>
                        <span style="margin-left: 50px">{{ group.nickname }}</span>
                        <el-badge style="position: absolute; right: 10px" class="mark" :value="3" />
                    </el-card>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "Home",
        props: {
            socket: Object
        },
        data () {
            return {
                switchFlag: true,
                friendList: [],
                groupList: []
            }
        },
        created () {
            this.axios.get('/user/getFriends?uid=' + sessionStorage.getItem('uid') + '&ppid=' + sessionStorage.getItem('ppid')).then(res => {
                if(res.data.code === '0000'){
                    this.socket.onmessage = this.getMessage;
                    this.socket.onopen = this.open;
                    this.socket.onclose = this.close;
                    this.socket.onerror = this.error;
                    for (let i = 0; i < res.data.data.length; i++){
                        this.friendList.push({
                            uid: res.data.data[i].uid,
                            ppid: res.data.data[i].ppid,
                            nickname: res.data.data[i].nickname,
                            messages: res.data.data[i].messages
                        });
                    }
                } else {
                    Toast({
                        message: '好友查询失败',
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
        destroyed () {
        },
        methods: {
            openSetting () {
                this.$emit('switchView', {chatShow: false, homeShow: false, settingShow: true});
                // this.$router.push({ name: 'Setting' });
            },
            clickItem (friend) {
                // eslint-disable-next-line no-console
                console.log('click');
                friend.messages;
                let messages = friend.messages;
                // friend.messages.length = 0;
                this.$emit('setFriend', { ppid: friend.ppid, nickname: friend.nickname, messages: messages});
                this.$emit('switchView', {chatShow: true, homeShow: false, settingShow: false});
                // this.$router.push({ name: 'Chat', params: { ppid: friend.ppid, nickname: friend.nickname, socket: this.socket, messages: messages} });
            },
            switchFriends () {
                this.switchFlag = true;
            },
            switchGroups () {
                this.switchFlag = false;
            },
            getMessage (msg) {
                let result = JSON.parse(msg.data);
                for(let i = 0; i < this.friendList.length; i++){
                    if(this.friendList[i].ppid === result.from){
                        this.friendList[i].messages.push(result);
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
