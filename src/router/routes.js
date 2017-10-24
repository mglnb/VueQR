import Index from '@/components/Index'
import QrReader from '@/components/Qr/QrReader'
import QrList from '@/components/Qr/QrList'
import QrWriter from '@/components/Qr/QrWriter'

import SideNav from '@/components/SharedComponents/SideNav'


const routes = [
    { path: '/', name: 'Index', component: Index },
    { path: '/reader', name: 'QrReader', component: QrReader },
    { path: '/list', name: 'QrList', component: QrList },
    { path: '/writer', name: 'QrWriter', component: QrWriter },
    { path: '/sidenav', name: 'SideNav', component: SideNav }
]

export default routes;