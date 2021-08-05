import { createApp } from 'vue'
import App from './App.vue'

// router
import router from './routes';

// ui설정
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';




const app = createApp(App);

app.use(router);  //router
app.use(ElementPlus); //element plus ui

app.mount('#app');
