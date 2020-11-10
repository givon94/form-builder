import Vue from 'vue'
import Router from 'vue-router'
//import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import NotFound from '@/components/Pages/NotFound'

Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/404',
            name: '404',
            component: NotFound,
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],
    mode: 'history'
})
