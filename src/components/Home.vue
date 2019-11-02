<template>
    <el-container class="el-container">
        <el-header class="el-header">
            <el-card style="width: 1000px; height: 100%; border-radius: 0;" shadow="never">
                <i class="el-icon-arrow-left" style="position: absolute; top: 50%; transform: translateY(-50%); font-size: 20px"></i>
                <div style="font-size: 16px; position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%)">{{ name }}</div>
            </el-card>
        </el-header>
        <el-main class="el-main">
            <div id="text-area" style="overflow: auto; padding: 10px 10px 0 10px">
                <div v-for="msg in msgList" class="infinite-list-item" :key="msg.index" style="margin-bottom: 10px">
                    <div style="text-align: left" v-if="msg.flag">
                        <el-card class="el-card" :body-style="{ padding: '12px' }" shadow="never" style="max-width: 75%">
                            <span style="word-break: break-all; white-space: normal">{{ msg.data }}</span>
                        </el-card>
                    </div>
                    <div style="text-align: right" v-else>
                        <el-card class="el-card" :body-style="{ padding: '12px' }" shadow="never" style="max-width: 75%; background-color: #409EFF">
                            <span style="word-break: break-all; white-space: normal; color: white">{{ msg.data }}</span>
                        </el-card>
                    </div>
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
        name: "Home",
        data () {
            return {
                socket: null,
                name: '未连接',
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
            sendMessage () {
                if (this.input === '') {
                    Toast({
                        message: '输入不能为空',
                        position: 'bottom',
                        duration: 2000
                    })
                } else {
                    this.socket.send(this.input);
                    this.msgList.push({flag: false, data: this.input});
                    this.input = '';
                }
            },
            getMessage (msg) {
                this.msgList.push({flag: true, data: msg.data});
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
