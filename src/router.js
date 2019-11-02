import VueRouter from 'vue-router';
import Vue from 'vue';
import Main from './components/Main';
import Login from './components/Login';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', name: 'Main', component: Main },
        { path: '/login', name: 'Login', component: Login }
    ]
})
