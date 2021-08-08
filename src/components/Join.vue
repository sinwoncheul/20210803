<template>
    <div>
        <h3>회원가입</h3>
        <hr />
        <input type="text" v-model="email" placeholder="이메일" />
        <span v-text="checkemail"></span><br />


        <input type="password" v-model="password1" placeholder="암호" />
        <input type="password" v-model="password2" placeholder="암호확인" /><br />
        <input type="text" v-model="name" placeholder="이름" /><br />
        <input type="text" v-model="phone" placeholder="전화번호" /><br />
        <input type="button" @click="handleJoin"  value="회원가입" />
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        methods : {
            async handleJoin() {
                if(this.name.length === 0){
                    return alert('이메일을 입력하세요');
                }
                
                const header = { "Content-Type" : "application/x-www-form-urlencoded" }
                const obj    = { 
                    email       : this.email, 
                    password    : this.password1,
                    name        : this.name,
                    phone       : this.phone,
                }
                const url    = `/member/join`;
                const response = await axios.post(url, obj, header);
                console.log(response);
                if(response.data.ret === 1) {
                    alert(response.data.data);
                }
            },
               validEmail: function (email) {
                var re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]*$/i;
                return re.test(email);
            }
        },

        data () {
            return {
                email     : '',
                password1 : '',
                password2 : '',
                name      : '',
                phone     : '',   
                checkemail : '',
            }
        },
        watch : { // 변수의 내용 변화 감지
            async email (val) {
                // 이메일 정규식 사용
                 if( this.validEmail(val) ) {
                    const header = { "Content-Type" : "application/x-www-form-urlencoded" }
                    const url = `/member/emailcheck?email=${val}`;
                    const response = await axios.get(url, header);
                    console.log(response);
                    if(response.data.data === 1) {
                        this.checkemail = "이미 사용중인 이메일입니다."
                    }
                    else {
                        this.checkemail = "사용 가능한 이메일입니다."
                    }
                }
                else {
                    this.checkemail = "이메일 중복 확인"
                }
            }
        }
    }
</script>

<style scoped>

</style>
