import {createWebHistory, createRouter} from 'vue-router';

// 화면에 표시할 컴포넌트 가져오기
import HelloWorld from '@/components/HelloWorld.vue'; 
import Menu1 from '@/components/Menu1.vue';
import Menu2 from '@/components/Menu2.vue';
import Menu3 from '@/components/Menu3.vue';
import Join from '@/components/Join.vue';
import Login from '@/components/Login.vue';
import Mypage from '@/components/Mypage.vue';
import Seller from '@/components/Seller.vue';

// url과 컴포넌트 매핑
const routes = [
    { path : '/', name:"HelloWorld", component : HelloWorld },
    { path : '/menu1', name:"Menu1", component : Menu1 },
    { path : '/menu2', name:"Menu2", component : Menu2 },
    { path : '/menu3', name:"Menu3", component : Menu3 },
    { path : '/join', name:"Join", component : Join },
    { path : '/login', name:"Login", component : Login },
    { path : '/mypage', name:"Mypage", component : Mypage },
    { path : '/seller', name:"Seller", component : Seller  },
];

// route 적용
const router = createRouter({
    history : createWebHistory(),     //<=== 여기 변경!!
    routes,
});
export default router;