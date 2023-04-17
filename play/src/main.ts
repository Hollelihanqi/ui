import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


// 开发阶段引入

// import YtoCustom from 'yto-custom'
// import 'yto-custom/dist/style.css'

import YtoCustom from '@yto/custom'
import '@yto/custom/dist/es/style.css'

const app = createApp(App)
app.use(YtoCustom)
app.mount('#app')
