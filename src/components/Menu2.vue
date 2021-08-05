<template>
    <div >

        <h3>글쓰기</h3>
        <hr />
      
        제목 : <input type="text" v-model="title" /><br/>
        내용 : <textarea rows="7" v-model="content"></textarea><br/>
        작성자 : <input type="text" v-model="writer" /><br />
        이미지 : <input type="file" @change="handleImage" /><br />
        <input type="button" @click="sendData" value="글쓰기" />
        
        <router-link to="/menu1">글목록으로</router-link>

    </div>
    
</template>


<script>
    import axios from 'axios';


    export default {
        methods:{
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
            }
        }
    }
</script>

<style scoped>


</style>