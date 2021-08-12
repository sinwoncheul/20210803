<template>

   <div>
        <el-card class="box-card" style="text-align: center;  " >
        <img :src="`/api_seller/image?code=${code}`" style="width:250px; height:250px" />

        <img :src="`/api_seller/image2?code=${code}&idx=0`" style="width:50px; height:50px" />
        <img :src="`/api_seller/image2?code=${code}&idx=1`" style="width:50px; height:50px" />
        <img :src="`/api_seller/image2?code=${code}&idx=2`" style="width:50px; height:50px" />
        <hr />
        {{item.name}}<br />
        가격 : {{item.price}}<br />
        설명 : {{item.text}} <br />
        주문개수 
        <select v-model="cnt">
            <option v-for="num in item.quantity" v-bind:key="num">
                {{num}}
            </option>
        </select> <br />
        <el-button style="margin-top:5px;" @click="handleOrder" type="primary">주문하기</el-button>

          
      </el-card>
    </div>

 
 
</template>

<script>
import axios from 'axios'


 export default {
     methods : {
         handleOrder()  {
             this.$router.push({
                 path:'/orderaction',
                 query:{ code: this.code, cnt : this. cnt}
             });
         }
     },
     async created() {
         const url = `/api_seller/selectone?code=${this.code}`
         const headers =  {"Content-Type" : "application/json"}
         const response = await axios.get(url,{headers});
         if(response.data.ret === 1){
                this.item = response.data.data;
         }
     },
   
     data() {
         return {
             //이전페이지에서 전달되는 code를 code변수에 넣음
             code : this.$route.query.code, // 현재물품번호
             item : '',                     // 현재 물품 정보들
             cnt  : 10,                     // 변경한 주문 수량
           
             
         }
     }
        
    }
</script>


<style scoped>

</style>