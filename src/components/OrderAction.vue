<script>
    import axios from 'axios';

    export default {
        async created(){
            const token = sessionStorage.getItem("TOKEN");
            if(token !== null){
                const url = `/api_seller/orderaction`;
                const headers = { 
                    "Content-Type" : "application/json", 
                    "token":token 
                };
                const body = { 
                    code : this.$route.query.code, // 물품코드
                    cnt  : this.$route.query.cnt    // 수량
                };

                const response = await axios.put(url, body, {headers});
                console.log(response);

                // 주문목록 페이지로 이동하기
                this.$router.push({path:'/orderlist'});
            }
            else {
                // 로그인 페이지로 이동하기
                this.$router.push({path:'/login'});
            }
        }
    }
</script>