<template>
    <div>
        <h3>상세화면</h3>
        <hr />
        글번호  {{row._id}} <br />
        제목  {{row.title}} <br />
        내용    {{row.content}} <br />
        작성자  {{row.writer}}<br />
        조회수 {{row.hit}}<br />
        이미지 <img :src="`/board/image?_id=${row._id}`" style="width:50px;height:50px" /><br />
        날짜 {{row.regdate}}<br />
        
        <hr />
        <input type="button" @click="handleDelete" value="삭제" />
        <input type="button" @click="dialogVisible=true" value="수정" />
        <input type="button" @click="handlePrev" value="이전글" />
        <input type="button" @click="handleNext" value="다음글" />

        <el-dialog title="게시글변경" v-model="dialogVisible" width="300">
            제목 : <input type="text" v-model="title"  /><br />
            내용 : <input type="text" v-model="content" /><br />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">취소</el-button>
                    <el-button type="primary" @click="handleUpdate">변경</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {

        data() {
            return {
                row : '',              //글번호를 이용한 현재 게시글 내용
                no  : this.$route.query._id,  // 현재의 글번호 정보
                dialogVisible : false,    // 글변경 dialog 표시 여부
                title : '',         // 변경시 임시 보관 변수
                content : '',       // 변경시 임시 보관 변수
            }
        },

        methods : {
            async handleNext() {
                const header = { "Content-Type" : "application/x-www-form-urlencoded" }
                const url = `/board/nextno?_id=${this.no}`;  
                const response = await axios.get(url, header);
                console.log(response)
                if(response.data.ret === 1){
                    const next = Number(response.data.data);
                    if( next > 0) {
                        this.$router.push( {path:'/menu3', query:{_id : next}});

                        this.no = next;
                        await this.handleContent();   
                    }
                }
            },
             async handlePrev() { //이전글
                const header = { "Content-Type" : "application/x-www-form-urlencoded" }
                const url = `/board/prevno?_id=${this.no}`;
                const response = await axios.get(url, header);
                console.log(response);
                if(response.data.ret === 1){
                    // 0 또는 이전글
                    const prev = Number(response.data.data);
                    if(prev > 0) {
                        // 현재 페이지가 /menu3에서 다시 menu3으로 이동X
                        // 뒤로가기 기록을 남기면 push    
                        // 뒤로가기 기록을 남기지 않을 거면 replace
                        this.$router.push(
                           { path:'/menu3', query:{_id:prev} });
                        
                        //글번호를 변경후 새로운 내용 가져오기
                        this.no = prev;
                        await this.handleContent();  // this.no를 사용 
                    }
                    else { // prev가 0인경우는 이동불가
                        alert('이전글이 없습니다.');
                    }
                }
            },
   




            async handleUpdate() {
                const header = { "Content-Type" : "application/x-www-form-urlencoded" }
                const url = `/board/update`;
                const obj = {
                    _id     : this.row._id,
                    title   : this.title,
                    content : this.content
                }
                const response = await axios.put(url, obj, header);
                console.log(response);
                if(response.data.ret === 1) { //변경 성공시 
                    this.dialogVisible = false;
                    await this.handleContent(); //변경된 내용으로 갱신
                }
            },

            async handleDelete() {
                this.$confirm('삭제하시겠습니까?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then( async () => {
                    // 파일 첨부가 아닌경우
                    const header = { "Content-Type" : "application/x-www-form-urlencoded" }
                    const url = `/board/delete?_id=${this.no}`;
                    const response = await axios.delete(url, header);
                    console.log(response);
                    if(response.data.ret === 1) { //삭제 성공
                        this.$router.push({path:'/menu1'}); // 목록페이지로 이동
                    }
                }).catch(() => {
                });
            },

            async handleContent(){
                const url = `/board/content?_id=` + this.no;
                const response = await axios.get(url);
                console.log(response);
                if(response.data.ret === 1){
                    this.row = response.data.data;
                    this.title = this.row.title;
                    this.content = this.row.content;
                }
            }
        },
        
        async created() {
            //methods에 만든 함수 호출
            await this.handleContent(); 
        }
    }
</script>

<style scoped>

</style>
