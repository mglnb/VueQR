import Index from '@/components/Index'
import QrReader from '@/components/QrReader'
import QrList from '@/components/QrList'
import QrWriter from '@/components/QrWriter'

const routes = [
    { path: '/', name: 'Index', component: Index },
    { path: '/reader', name: 'QrReader', component: QrReader },
    { path: '/list', name: 'QrList', component: QrList },
    { path: '/writer', name: 'QrWriter', component: QrWriter }
]

export default routes;