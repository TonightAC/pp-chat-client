<template>
    <div>
        <Chat @switchView="switchView" @newMessage="newMessage" v-if="chatShow" :socket="this.socket" :friend="this.friend"></Chat>
        <Home @switchView="switchView" @setFriend="setFriend" v-if="homeShow" :hasAdd="this.hasAdd" :socket="this.socket" :friend-list="this.friendList"></Home>
        <Add @hasLookedAdd="hasLookedAdd" @switchView="switchView" v-if="addShow" :hasAdd="this.hasAdd" :friend-list="this.friendList"></Add>
        <Setting @switchView="switchView" v-if="settingShow"></Setting>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import Home from "./Home";
    import Chat from "./Chat";
    import Setting from "./Setting";
    import Add from "@/components/Add";
    export default {
        name: "Main",
        components: {Add, Setting, Chat, Home},
        data () {
            return {
                path: 'ws://192.168.1.102:1979/websocket/',
                friendList: [],
                friend: null,
                socket: null,
                hasAdd: false,
                chatShow: false,
                homeShow: true,
                addShow: false,
                settingShow: false
            }
        },
        created() {
            this.axios.get('/user/getFriends?uid=' + sessionStorage.getItem('uid') + '&ppid=' + sessionStorage.getItem('ppid')).then(res => {
                if(res.data.code === '0000'){
                    this.socket = new WebSocket(this.path + sessionStorage.getItem('ppid'));
                    this.friendList = res.data.data;
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
            this.axios.get('/relation/hasAdd?ppid=' + sessionStorage.getItem('ppid')).then(res => {
                if(res.data.code === '0000'){
                    this.hasAdd = String(res.data.data) === 'true';
                } else {
                    Toast({
                        message: '添加信息查询失败',
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
        methods: {
            switchView (switchs) {
                this.chatShow = switchs.chatShow;
                this.homeShow = switchs.homeShow;
                this.addShow = switchs.addShow;
                this.settingShow = switchs.settingShow;
            },
            setFriend (friend) {
                this.friend = friend;
            },
            newMessage (msg) {
                for(let i = 0; i < this.friendList.length; i++){
                    if(this.friendList[i].ppid === msg.from){
                        this.friendList[i].messages.push(msg);
                        break;
                    }
                }
            },
            hasLookedAdd (flag) {
                this.hasAdd = flag;
            }
        }
    }
</script>

<style scoped>

</style>
