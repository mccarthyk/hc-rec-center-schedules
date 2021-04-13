import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/main.scss'
import 'iframe-resizer/js/iframeResizer.contentWindow'

createApp(App).use(router).mount('#app')
