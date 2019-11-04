import VueRouter from 'vue-router';
import Vue from 'vue';
import Main from './components/Main';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chat from './components/Chat';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', name: 'Main', component: Main },
        { path: '/login', name: 'Login', component: Login },
        { path: '/signUp', name: 'SignUp', component: SignUp },
        { path: '/chat', name: 'Chat', component: Chat }
    ]
})
