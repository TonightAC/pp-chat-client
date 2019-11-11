<template>
    <div>
        <Chat @switchView="switchView" v-if="chatShow" :socket="this.socket" :friend="this.friend"></Chat>
        <Home @switchView="switchView" @setFriend="setFriend" v-if="homeShow" :socket="this.socket"></Home>
        <Setting @switchView="switchView" v-if="settingShow"></Setting>
    </div>
</template>

<script>
    import Home from "./Home";
    import Chat from "./Chat";
    import Setting from "./Setting";
    export default {
        name: "Main",
        components: {Setting, Chat, Home},
        data () {
            return {
                path: 'ws://localhost:1979/websocket/',
                friend: null,
                socket: null,
                chatShow: false,
                homeShow: true,
                settingShow: false
            }
        },
        created() {
            this.socket = new WebSocket(this.path + sessionStorage.getItem('ppid'));
        },
        methods: {
            switchView (switchs) {
                this.chatShow = switchs.chatShow;
                this.homeShow = switchs.homeShow;
                this.settingShow = switchs.settingShow;
            },
            setFriend (friend) {
                this.friend = friend;
            }
        }
    }
</script>

<style scoped>

</style>
