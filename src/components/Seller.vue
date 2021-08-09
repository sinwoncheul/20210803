<template>
    <div>
        <h3>판매자 페이지</h3>
        <h4 />
        <input type="button" @click="menu = 1" value="물품일괄등록" />
        <input type="button" @click="menu = 2" value="주문내역확인" />
        <input type="button" @click="menu = 3" value="판매량 분석" />    

        <div v-if="menu === 1">
            <table>
                <tr v-for="num in count" v-bind:key="num">
                    <td>{{num}}</td>
                    
                    <td><input type="text" v-model="name[num-1]" placeholder="물풍명"/></td>
                    <td><input type="text" v-model="text[num-1]" placeholder="물풍내용"/></td>
                    <td><input type="text" v-model="price[num-1]"   placeholder="물풍가격"/></td>
                    <td><input type="text" v-model="quantity[num-1]" placeholder="물풍수량"/></td>
                    <td><input type="file" @change="handleImage($event,num-1)" accept="image/*" /></td>
                </tr>
            </table>
            <input type="button" @click="count++" value="항목추가" />
            <input type="button" @click="handleMinus" value="항목해제" />
            <input type="button" @click="handleInsert" value="일괄추가" />


        </div>    

         <div v-else-if="menu === 2">

        </div>  

         <div v-else-if="menu === 3">

        </div>       

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        methods : {
            async handleInsert() {
                const url = '/api_seller/insert';
                const headers = { "Content-Type" :  "multipart/form-data"};
                const body = new FormData();

                for(let i=0; i<this.count;i++){
                body.append("name", this.name[i]);
                body.append("text", this.text[i]);
                body.append("price", this.price[i]);
                body.append("quantity", this.quantity[i]);
                body.append("image", this.image[i]);
                }
                console.log(body);

                const response = await axios.post(url, body , {headers});
                console.log(response);
            },
            async handleMinus() {
                this.count = this.count - 1;
                if(this.count < 1) {
                    this.count = 1;
                }
            },
            handleImage(e,idx) {
                console.log(e);
                console.log(idx);
                
                if(e.target.files.length > 0) {
                    this.image[idx] = e.target.files[0]
                }
                
            }

        },
        data() {
            return {
                menu     : 1,
                count    : 2,
                name     : [],
                text     : [],
                price    : [],
                quantity : [],
                image    : [],
                

            }
        }
    }
</script>

<style scoped>

</style>