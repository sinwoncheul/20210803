<template>
    <div>
        <h3>마이페이지</h3>
        <hr />

        <input type="button" @click="menu = 1" value="정보수정" />
        <input type="button" @click="menu = 2" value="암호변경" />
        <input type="button" value="회원탈퇴" />
        <input type="button" value="로그아웃" />
        <hr />
        <div v-if="menu === 1">
            이름 : <input type="text" v-model="name" />
            연락처 : <input type="text" v-model="phone" />
            <input type="button" @click="handleUpdate" value="정보수정" />
        </div>    
        <div v-else-if="menu === 2">
            새로운암호 <input type="password" v-model="password" placeholder="변경할 암호" />
            <input type="button" @click="handleChangepw" value="변경완료" />
        </div>    
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods:{
             handleChangePw : async function() {
                const token = sessionStorage.getItem("TOKEN");
                console.log(token);
                      if(token === null){
                    const url = `/member/changepw`;
                    const headers = { 
                        "Content-Type" : "application/json",
                        "token" : token
                    };
                    const body = {  password : this.password };
                    console.log(body);
                    const response = await axios.put(url, body, {headers});
                    console.log(response);
                    if(response.data.ret === 1){
                        alert(response.data.data);
                    }
                }
            },
          
            async handleUpdate(){
                const token = sessionStorage.getItem("TOKEN");
                console.log(token);
                if(token === null){
                    const url = `/member/update`;
                    const headers = { 
                        "Content-Type" : "application/json",
                        "token" : token
                    };
                    const body = {  name : this.name, phone: this.phone  };
                    console.log(body);
                    const response = await axios.put(url, body, {headers});
                    console.log(response);
                    if(response.data.ret === 1){
                        alert(response.data.data);
                    }
                }
            }
        },
        data() {
           return {
               menu : 1,
               name : '',
               phone : '',
               password : '',
           }
       }     
    }
</script>

<style scoped>

</style>
