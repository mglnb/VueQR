import Index from '@/components/Index'
import QrReader from '@/components/Qr/QrReader'
import QrList from '@/components/Qr/QrList'
import QrWriter from '@/components/Qr/QrWriter'

import Login from '@/components/Auth/Login'

const routes = [
    { path: '/', name: 'Index', component: Index, meta: {requireAuth: true} },
    { path: '/reader', name: 'QrReader', component: QrReader },
    { path: '/list', name: 'QrList', component: QrList, meta: {requireAuth: true} },
    { path: '/writer/', name: 'QrWriter', component: QrWriter, meta: {requireAuth: true} },
    { path: '/writer/:id', name: 'QrWriter', component: QrWriter, meta: {requireAuth: true} },
    { path: '/login', name: 'Login', component: Login } 
]

export default routes;