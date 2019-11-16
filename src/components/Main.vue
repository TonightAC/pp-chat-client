<template>
    <div>
        <Chat @addToFriendList="addToFriendList" @switchView="switchView" @newMessage="newMessage" v-if="chatShow" :socket="this.socket" :friend="this.friend"></Chat>
        <Home @addToFriendList="addToFriendList" @switchView="switchView" @setFriend="setFriend" v-if="homeShow" :hasAdd="this.hasAdd" :socket="this.socket" :friend-list="this.friendList"></Home>
        <Add @addToFriendList="addToFriendList" @hasLookedAdd="hasLookedAdd" @switchView="switchView" v-if="addShow" :hasAdd="this.hasAdd" :friend-list="this.friendList" :confirm-list="this.confirmList"></Add>
        <Setting @switchView="switchView" v-if="settingShow"></Setting>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import Home from "./Home";
    import Chat from "./Chat";
    import Setting from "./Setting";
    import Add from "./Add";
    export default {
        name: "Main",
        components: {Add, Setting, Chat, Home},
        data () {
            return {
                path: 'ws://localhost:1979/websocket/',
                confirmList: [],
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
            this.axios.get('/relation/getAdds?ppid=' + sessionStorage.getItem('ppid')).then(res => {
                if(res.data.code === '0000'){
                    for(let i = 0; i < res.data.data.length; i++){
                        this.confirmList.push(res.data.data[i]);
                    }
                    this.hasAdd = !(this.confirmList.length === 0);
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
            },
            addToFriendList (friend) {
                this.friendList.push({
                    uid: Number(friend.uid),
                    ppid: String(friend.ppid),
                    nickname: String(friend.nickname),
                    messages: []
                });
            }
        }
    }
</script>

<style scoped>

</style>
