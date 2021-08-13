<script>
    import axios from 'axios';
    
    export default {
        async created() {
            const ret = confirm('로그아웃 할까요?'); // Y or N
            if( ret ) {
                // [POST] /member/logout
                const token = sessionStorage.getItem("TOKEN");
                if (token !== null) {
                    const headers = { 
                        "Content-Type" : "application/json",
                        "token" : token
                    };
                    const url  = `/member/logout`;
                    const body = {};
                    const response = await axios.post(url, body, {headers});
                    console.log(response);
                    if(response.data.ret === 1){
                        alert(response.data.data);
                        this.$router.push({path:'/'});

                        // 부모인 App.vue쪽으로 true를 전달함
                        this.$emit('changeLogged', false);
                    }
                }
            }
        }        
    }
</script>
