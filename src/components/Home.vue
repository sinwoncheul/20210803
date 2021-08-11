<template>
  <div v-for="(item, idx) in items" v-bind:key="item">
    <el-row v-if="idx%4===0" :gutter="12" style="margin-bottom:5px; text-align: center; ">
      <el-col :span="6">
        <el-card shadow="always">
          <div v-if="idx < (items.length)">
           
              <el-image style="width: 100%; height: 130px "  @click="handleContent( items[idx]._id )"
                :src="`/api_seller/image?code=${items[idx]._id}`" fit="fill"></el-image>
                   {{idx}}
                  물품명 : {{items[idx].name}} <br />
                  가격   : {{items[idx].price}} <br />
                  수량   : {{items[idx].quantity}} <br />
                 <el-button style="margin-top:5px;" @click="handlebtn(items[idx]._id)" type="primary">주문하기</el-button>
          </div>
          <div v-else>
              {{idx}}
              <el-image style="width: 100%; height: 130px"
                :src="``" fit="fill"></el-image>  
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="always">
          <div v-if="(idx+1) < (items.length)">
      
              <el-image style="width: 100%; height: 130px" @click="handleContent(items[idx]._id)" 
                :src="`/api_seller/image?code=${items[idx+1]._id}`" fit="fill"></el-image>    
                   {{idx+1}}
                물품명 : {{items[idx+1].name}} <br />
                가격   : {{items[idx+1].price}} <br />
                수량   : {{items[idx].quantity}} <br />
                   <el-button style="margin-top:5px;" @click="handlebtn(items[idx]._id)" type="primary">주문하기</el-button> 
          </div>
          <div v-else>
              {{idx+1}}
              <el-image style="width: 100%; height: 130px"
                :src="``" fit="fill"></el-image>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="always">
          <div v-if="(idx+2) < (items.length)">
        
            <el-image style="width: 100%; height: 130px" @click="handleContent(items[idx]._id)"
              :src="`/api_seller/image?code=${items[idx+2]._id}`" fit="fill"></el-image>         
                        {{idx+2}}
                 물품명 : {{items[idx+2].name}} <br />
                 가격   : {{items[idx+2].price}} <br />
                 수량   : {{items[idx].quantity}} <br />
                  <el-button style="margin-top:5px;" @click="handlebtn(items[idx]._id)" type="primary">주문하기</el-button>    
          </div>
          <div v-else>
              {{idx+2}}
              <el-image style="width: 100%; height: 130px"
                :src="``" fit="fill"></el-image>
          </div>            
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="always">
          <div v-if="(idx+3) < (items.length)">
            
              <el-image style="width: 100%; height: 130px" @click="handleContent(items[idx]._id)"
                :src="`/api_seller/image?code=${items[idx+3]._id}`" fit="fill"></el-image>   
                        {{idx+3}}
                물품명 : {{items[idx+3].name}} <br />
                가격   : {{items[idx+3].price}} <br />   
                수량   : {{items[idx].quantity}} <br />    
                <el-button style="margin-top:5px;" @click="handlebtn(items[idx]._id)" type="primary">주문하기</el-button> 
             
          </div>
          <div v-else>
              {{idx+3}}
              <el-image style="width: 100%; height: 130px"
                :src="``" fit="fill"></el-image>
          </div>                       
        </el-card>
      </el-col>      
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async created(){
    const url =`/api_seller/select?page=${this.page}&name=`;
    const headers = { "Content-Type" : "application/json" };
    const result = await axios.get(url, {headers});
    console.log(result);
    if(result.data.ret === 1){
      console.log(result.data.data);
      this.items = result.data.data;
    }
  },

  data(){
    return {
      items : [],   // 물품목록 저장
      page  : 1,
    }
  },

  methods:{
     handlebtn(code){
      //127.0.0.1:8080/order?code=34
      this.$router.push({path:'/order', query:{code:code}});
    },
    
    handleContent(code){
      //127.0.0.1:8080/order?code=34
      this.$router.push({path:'/order', query:{code:code}});
    }
  },
  
}
</script>

<style scoped>

</style>

