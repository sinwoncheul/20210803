<template>
    <div>
        <h3>로그인</h3>
        <hr />
        <input type="text" v-model="email" placeholder="이메일" />
        <input type="password" v-model="password" placeholder="암호" />
        <input type="button" @click="handleLogin" value="로그인" />
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods: {
            async handleLogin () {
                const header = { "Content-Type" : "application/x-www-form-urlencoded" };
                const body = { email : this.email, password: this.password };
                const url = `/member/login`;
                const response = await axios.post(url, body, header); 
                console.log(response);
                if( response.data.ret === 1 ) {
                    sessionStorage.setItem("TOKEN", response.data.jwtToken.token);
                    alert('로그인 되었습니다.');
                    
                    var url1 = sessionStorage.getItem("URL");
                    url1     = JSON.parse(url1); //string -> object
                    console.log(typeof(url1));
                    console.log(url1);
                    
                    if(url1 !== null) {
                        this.$router.push({path:url1.path, query:url1.query})
                    }
                    else {
                        this.$router.push({path:'/'})

                        this.$emit('changeLogged', true);
                    }
                }
            }
        },
        data() {
            return {
                email : '',
                password : '',
            }
        }        
    }
</script>

<style scoped>

</style>
