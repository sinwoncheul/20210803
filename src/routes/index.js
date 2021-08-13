import {createWebHistory, createRouter} from 'vue-router';

// 화면에 표시할 컴포넌트 가져오기
import Home from '@/components/Home.vue'; 
import Menu1 from '@/components/Menu1.vue';
import Menu2 from '@/components/Menu2.vue';
import Menu3 from '@/components/Menu3.vue';
import Join from '@/components/Join.vue';
import Login from '@/components/Login.vue';
import Mypage from '@/components/Mypage.vue';
import Seller from '@/components/Seller.vue';
import Order from '@/components/Order.vue';
import OrderAction from '@/components/OrderAction.vue';
import Orderlist from '@/components/Orderlist.vue';
import Logout from '@/components/Logout.vue';
import axios from 'axios';
    


// url과 컴포넌트 매핑
const routes = [
    { path : '/', name:"Home", component : Home},
    { path : '/menu1', name:"Menu1", component : Menu1 },
    { path : '/menu2', name:"Menu2", component : Menu2 },
    { path : '/menu3', name:"Menu3", component : Menu3 },
    { path : '/join', name:"Join", component : Join },
    { path : '/login', name:"Login", component : Login },
    { path : '/mypage', name:"Mypage", component : Mypage },
    { path : '/seller', name:"Seller", component : Seller  },
    { path : '/order', name:"Order", component : Order  },
    { path : '/orderaction', name:"OrderAction", component : OrderAction  },
    { path : '/orderlist', name:"Orderlist", component : Orderlist  },
    { path : '/logout', name:"Logout", component : Logout  },
];

// route 적용
const router = createRouter({
    history : createWebHistory(),     //<=== 여기 변경!!
    routes,
    
});

// order -> orderaction
router.beforeEach( async(to, from, next ) => {
    console.log(to);
    console.log(from);

    // 로그인 인증
    var result = 0;
    const token = sessionStorage.getItem("TOKEN");
    if (token !== null) {
        // 유효한 토큰인지 확인
        const url = `/member/validtoken`;
        const headers = { 
            "Content-Type" : "application/json", 
            "token":token 
        };
        const response = await axios.get(url, {headers});
        console.log(response);
        result = response.data.ret; //-1, 0, 1로 넘어옴
    }

    
    // URL을 등록을 하지 않는 페이지(Login, Join 등)
    // sessionStorage.setItem("URL", 
    //     JSON.stringify({path:"/", query:{}})
    // );

    // URL을 반드시 등록해야 하는 곳 (OrderAction, )
    if(to.name !== 'Login' 
        && to.name !== 'Join' ){ 
        sessionStorage.setItem(
            "URL", JSON.stringify({path:to.path, query:to.query})
        );
    }

    if(to.name === 'OrderAction' && result !== 1) {
        // to.fullPath => 이동하고자하는 url전체 정보
        next({name:'Login'}); // 로그인페이지로 이동
    }
    //else if(to.name === 'Menu2' && result !== 1) {
    //    next({name:'Login'}); // 로그인페이지로 이동
    //}
    else {
        next() // 원래 이동하고자하는 페이지
    }
});

export default router;