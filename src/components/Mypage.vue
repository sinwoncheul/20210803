<template>
    <div>
        <h3>마이페이지</h3>
        <hr />

        <input type="button" @click="menu = 1" value="정보수정" />
        <input type="button" @click="menu = 2" value="암호변경" />
        <input type="button" @click="handleDelete" value="회원탈퇴" />
        <input type="button" @click="handleLogout" value="로그아웃" />
        <input type="button" @click="handleOrderList" value="주문목록" />
        <hr />
        <div v-if="menu === 1">
            이름 : <input type="text" v-model="name" />
            연락처 : <input type="text" v-model="phone" />
            <input type="button" @click="handleUpdate" value="정보수정" />
        </div>    
        <div v-else-if="menu === 2">
            <form @submit="handleChangePw"> 
                새로운암호 <input type="password" v-model="password"
                    placeholder="변경할 암호" />
                <input type="button" @click="handleChangePw" value="암호변경" />
            </form>
        </div>  
        <div v-else-if="menu === 5">  
            <div v-for="item in items" v-bind:key="item">
                <input type="checkbox" />
                {{item._id}}
                {{item.email}}
                {{item.cnt}}
                <input type="button" value="주문취소" />
            </div>   
            <input type="button" @click="chks" value="선택주문취소" />
        </div>    
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
     methods :{
            // 선택된 주문 삭제
            async handleDeleteCheck (){
                const url = `/api_seller/orderdelete`;
                const response = await axios.delete(url, {
                    headers: {
                        "Content-Type" : "application/json", 
                        "token" : this.token 
                    },
                    data: {
                        arrNo: this.chks
                    }
                });
                console.log(response);
            },
            async handleOrderList() {
                if(this.token !== null){
                    const url = `/api_seller/orderlist`;
                    const headers = { 
                        "Content-Type" : "application/json", 
                        "token" : this.token 
                    };
                    const response = await axios.get(url, {headers});
                    if(response.data.ret === 1){
                        this.items = response.data.data;
                    }
                }
                this.menu = 5;
            },

            async handleDelete() {
                const ret = confirm('탈퇴 할까요?'); // Y or N
                if( ret ) {
                    // [DELETE] /member/delete     
                    const token = sessionStorage.getItem("TOKEN");
                    if (token !== null) {
                        const headers = { 
                            "Content-Type" : "application/json",
                            "token" : token
                        };
                        const url  = `/member/delete`;
                        const response = await axios.delete(url, {headers});
                        console.log(response);
                        if(response.data.ret === 1){
                            alert(response.data.data);
                            this.$router.push({path:'/'});
                        }
                    }
                }
            },

            async handleLogout() {
                this.$router.push({path:'/logout'});
            },

            // 암호 변경
            handleChangePw : async function(e) {
                e.preventDefault(); // form전송되는것 막기

                // 세션 스토리지에서 토큰 읽기
                const token = sessionStorage.getItem("TOKEN");
                if (token !== null) {
                    const url = `/member/changepw`;
                    const headers = { 
                        "Content-Type" : "application/json",
                        "token" : token
                    };
                    const body = { newpassword : this.password };

                    const response = await axios.put(url, body, {headers:headers});
                    console.log(response);
                    if(response.data.ret === 1) {
                        alert(response.data.data);
                    }
                    else {
                        alert('암호가 변경되지 않았습니다.');
                    }
                }
            },

            async handleUpdate() {
                const token = sessionStorage.getItem("TOKEN");
                console.log(token);

                if(token !== null){
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
                menu     : 1,
                name     : '',
                phone    : '',
                password : '',
            
                token : sessionStorage.getItem("TOKEN"), 
                items : [],
                chks  : [],
           }
       }     
    }
</script>

<style scoped>

</style>
