<template>
    <div>
        <Chat @switchView="switchView" @newMessage="newMessage" v-if="chatShow" :socket="this.socket" :friend="this.friend"></Chat>
        <Home @switchView="switchView" @setFriend="setFriend" v-if="homeShow" :socket="this.socket" :friend-list="this.friendList"></Home>
        <Setting @switchView="switchView" v-if="settingShow"></Setting>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import Home from "./Home";
    import Chat from "./Chat";
    import Setting from "./Setting";
    export default {
        name: "Main",
        components: {Setting, Chat, Home},
        data () {
            return {
                path: 'ws://localhost:1979/websocket/',
                friendList: [],
                friend: null,
                socket: null,
                chatShow: false,
                homeShow: true,
                settingShow: false
            }
        },
        created() {
            this.axios.get('/user/getFriends?uid=' + sessionStorage.getItem('uid') + '&ppid=' + sessionStorage.getItem('ppid')).then(res => {
                if(res.data.code === '0000'){
                    this.socket = new WebSocket(this.path + sessionStorage.getItem('ppid'));
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
        methods: {
            switchView (switchs) {
                this.chatShow = switchs.chatShow;
                this.homeShow = switchs.homeShow;
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
            }
        }
    }
</script>

<style scoped>

</style>
