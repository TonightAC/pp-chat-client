import VueRouter from 'vue-router';
import Vue from 'vue';
import Main from '../components/Main';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Chat from '../components/Chat';
import Setting from '../components/Setting';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            meta: {
                requireAuth: true,
                keepAlive: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signUp',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/chat',
            name: 'Chat',
            component: Chat,
            meta: {
                requireAuth: true
            }

        },
        {
            path: '/setting',
            name: 'Setting',
            component: Setting,
            meta: {
                requireAuth: true
            }
        }
    ]
});

export default router;

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (sessionStorage.getItem("token") === 'true') {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    } else {
        next();
    }
});

