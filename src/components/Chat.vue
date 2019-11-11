<template>
    <el-container class="el-container">
        <el-header class="el-header">
            <el-card style="width: 100%; height: 100%; border-radius: 0" shadow="never">
                <el-badge :value="badgeValue" :hidden="badgeHidden"	style="padding: 0; position: absolute; z-index: 2; left: 40px; top: 53%; transform: translateY(-50%)"></el-badge>
                <i @click="back" class="el-icon-arrow-left" style="position: absolute; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
                <div style="font-size: 16px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">{{ name }}</div>
            </el-card>
        </el-header>
        <el-main id="container" class="el-main">
            <div v-for="msg in msgList" :key="msg.index" style="margin-bottom: 5px">
                <div style="text-align: left; position: relative" v-if="msg.flag">
                    <el-avatar size="large" src="https://empty" style="position: absolute; top: 3px; left: 0">
                        <img src="../assets/avatar/avatar1.png" alt="avatar"/>
                    </el-avatar>
                    <el-card class="el-card" :body-style="{ padding: '12px' }" shadow="never" style="max-width: 75%; margin-left: 50px">
                        <span style="word-break: break-all; white-space: normal">{{ msg.data }}</span>
                    </el-card>
                </div>
                <div style="text-align: right; position: relative" v-else>
                    <el-card class="el-card" :body-style="{ padding: '12px' }" shadow="never" style="max-width: 75%; background-color: #409EFF; margin-right: 50px">
                        <span style="word-break: break-all; white-space: normal; color: white">{{ msg.data }}</span>
                    </el-card>
                    <el-avatar size="large" src="https://empty" style="position: absolute; top: 3px; right: 0">
                        <img src="../assets/avatar/avatar1.png" alt="avatar"/>
                    </el-avatar>
                </div>
            </div>
        </el-main>
        <el-footer class="el-footer">
            <el-row class="message-box">
                <el-col style="padding-right: 3px" :span="18"><el-input class="el-input" v-model="input" :rows="1"></el-input></el-col>
                <el-col style="padding-left: 3px" :span="6"><el-button type="primary" class="el-button" @click="sendMessage" plain>发送</el-button></el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "Chat",
        props: {
            socket: Object,
            friend: Object
        },
        data () {
            return {
                badgeValue: 0,
                badgeHidden: true,
                name: '未连接',
                fromId: '',
                toId: '',
                input: '',
                msgList: []
            }
        },
        created () {
            if(this.friend.nickname != null) this.name = this.friend.nickname;
            this.fromId = sessionStorage.getItem("ppid");
            this.toId = this.friend.ppid;
            let localMsgList = JSON.parse(sessionStorage.getItem(String(this.toId)));
            if(localMsgList != null){
                this.msgList = localMsgList;
            }
            for(let i = 0; i < this.friend.messages.length; i++){
                this.msgList.push({flag: true, data: this.friend.messages[i].data});
            }
            this.friend.messages.length = 0;
            this.socket.onmessage = this.getMessage;
            this.socket.onopen = this.open;
            this.socket.onclose = this.close;
            this.socket.onerror = this.error;
        },
        destroyed () {
            sessionStorage.setItem(String(this.toId), JSON.stringify(this.msgList));
        },
        methods: {
            sendMessage () {
                if (this.input === '') {
                    Toast({
                        message: '输入不能为空',
                        position: 'bottom',
                        duration: 2000
                    })
                } else {
                    this.socket.send(JSON.stringify({from: this.fromId, to: this.toId, data: this.input}));
                    this.msgList.push({flag: false, data: this.input});
                    this.input = '';
                    this.$nextTick(() => {
                        let container = this.$el.querySelector("#container");
                        container.scrollTop = container.scrollHeight;
                    })
                }
            },
            getMessage (msg) {
                let result = JSON.parse(msg.data);
                if(result.from === this.friend.ppid){
                    this.msgList.push({flag: true, data: result.data});
                    this.$nextTick(() => {
                        let container = this.$el.querySelector("#container");
                        container.scrollTop = container.scrollHeight;
                    });
                }else{
                    this.badgeValue++;
                    this.badgeHidden = false;
                    this.$emit('newMessage', result);
                }
            },
            open () {
            },
            close () {
            },
            error () {
            },
            back () {
                this.$emit('switchView', {chatShow: false, homeShow: true, addShow: false, settingShow: false});
            }
        }
    }
</script>

<style scoped>
    .el-container {
        height: 100%;
    }
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
        padding: 10px 10px 0 10px;
    }
    .el-footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px;
    }
    .message-box {
        height: 100%;
        width: 100%;
    }
    .el-input {
        width: 100%;
    }
    .el-button {
        width: 100%;
    }
    .el-card {
        border-radius: 10px;
        display: inline-block;
    }
</style>
