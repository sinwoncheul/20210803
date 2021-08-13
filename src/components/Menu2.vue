<template>
    <el-card class="box-card">
    <div style="text-align: center;" >

        <h3>글쓰기</h3>
        <hr />
        <el-input placeholder="제목" style="width : 300px;" v-model="title"></el-input> <br />
        <!-- 제목 : <input type="text" v-model="title" /><br/> -->
          <el-input type="textarea" :rows="2" placeholder="내용" style="width : 300px; margin-top: 20px;  " v-model="content"> </el-input> <br />
        <!-- 내용 : <textarea rows="7" v-model="content"></textarea><br/> -->
         <el-input placeholder="작성자" style="width : 300px; margin-top: 20px;"   v-model="writer"></el-input> <br />
        <!-- 작성자 : <input type="text" v-model="writer" /><br /> -->
        
        이미지 : <input type="file" style="margin-top: 20px;" @change="handleImage" /><br />
        <el-button type="primary" style="margin-top: 20px; margin-right: 20px" @click="sendData" >글쓰기</el-button>
            
        <el-link to="/menu1"  type="warning">글목록으로</el-link>
        
        <!-- <el-button type="primary" @click="sendData" >글쓰기</el-button>
        <el-link to="/menu1" type="warning">글목록으로</el-link> -->
        

    </div>
    </el-card>
    
</template>


<script>
    import axios from 'axios';


    export default {
        methods:{

            boradlist(){
                this.$$router.push({path:'/menu1'});
                
            },
            async sendData(){
                const url = `/board/insert`;
                const header = { "Content-Type" : "multipart/form-data" };

                const formData = new FormData();
                formData.append("title", this.title);
                formData.append("content", this.content);
                formData.append("writer", this.writer);
                formData.append("file", this.image);

                const response = await axios.post(url, formData, header);
                console.log(response);
                if(response.data.ret === 1) {
                    alert(response.data.data);
                    this.$router.push({path:'/menu1'});
                }
                else {
                    alert('글쓰기 실패했습니다.');
                }
            },
            handleImage(e){
                // e로 전송되는 파일정보를 image변수에 넣어줌.
                console.log(e);
                if(e.target.files.length > 0) {
                    this.image = e.target.files[0];
                }
            }
        },
        data() {
            return {
    
                title : '',
                content : '',
                writer : '',
                image : '',
                input : ''
            }
        }
    }
</script>


<style scoped>

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 680px;
    height: 400px;
    margin-left: auto;
    margin-right: auto;
  }


</style>