<template>
    <el-container class="el-container">
        <el-header class="el-header"></el-header>
        <el-main class="el-main">
            <div class="infinite-list" v-infinite-scroll="load" style="overflow: auto; padding: 10px 10px 0 10px">
                <div v-for="msg in msgList" class="infinite-list-item" :key="msg.index" style="margin-bottom: 10px">
                    <el-card style="margin-right: 100px; padding: 5px" v-if="false"><span>{{ msg }}</span></el-card>
                    <el-card shadow="always" style="margin-left: 100px" v-else><span>{{ msg }}</span></el-card>
                </div>
            </div>
        </el-main>
        <el-footer class="el-footer">
            <el-row class="message-box">
                <el-col style="padding-right: 5px" :span="18"><el-input class="el-input" v-model="input" :rows="1"></el-input></el-col>
                <el-col style="padding-left: 5px" :span="6"><el-button type="primary" class="el-button" @click="sendMessage" plain>发送</el-button></el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data () {
            return {
                socket: null,
                path: 'ws://localhost:1979/websocket/',
                id: '100000',
                input: '',
                msgList: []
            }
        },
        created () {
            this.socket = new WebSocket(this.path + this.id);
            this.socket.onmessage = this.getMessage;
            this.socket.onopen = this.open;
            this.socket.onclose = this.close;
            this.socket.onerror = this.error;
        },
        methods: {
            load () {
            },
            sendMessage () {
                this.socket.send(this.input);
                this.msgList.push(this.input);
                this.input = '';
            },
            getMessage (msg) {
                this.msgList.push(msg.data);
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
    .el-container {
        height: 100%;
    }
    .el-header {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        background-color: #B3C0D1;
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
        background-color: #E9EEF3;
    }
    .el-footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #B3C0D1;
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
</style>
