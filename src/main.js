import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
// pinia
import pinia from '@/store/index'
//自动指令事件
import touch from '@/utils/touch.js';


const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(touch);
app.mount('#app')
