<template>
    <div>
        
        <input type="text" v-model="text" 
            placeholder="검색" @keyup.enter="handleSearch" />
        <el-table :data="rows" style="width: 100%">
            <el-table-column prop="_id" label="글번호" width="100"></el-table-column>
            
            <el-table-column label="제목" width="120">
                <template #default="scope">
                    <router-link @click="handleHit(scope.row._id)" :to="`/menu3?_id=${scope.row._id}`">{{scope.row.title}}</router-link>
                </template>
            </el-table-column>
            
            <el-table-column prop="writer" label="작성자" width="180"></el-table-column>
            <el-table-column prop="hit" label="조회수" width="180"></el-table-column>
            <el-table-column prop="regdate" label="날짜" width="280"></el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next"
            :total="pages" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                rows  : [],      // 게시물 목록
                text  : '',      // 검색어 저장      
                pages : 0,       // 전체 페이지수
                page  : 1,       // 현재 클릭한 페이지번호
            }
        },

        methods:{
            async handleHit(_id) {
                const url = `board/hit?_id=${_id}`;
                await axios.put(url);
            },
            async handleCurrentChange(val){
                this.page = val;
                await this.handleSearch();
            },

            async handleSearch() {
                //게시물 조회
                let url = `/board/select?page=${this.page}&text=${this.text}`;
                let response = await axios.get(url);
                if(response.data.ret === 1) {
                    this.rows = response.data.data;
                }

                //게시물 전체 개수 조회
                url = `/board/count?text=${this.text}`;
                response = await axios.get(url);
                console.log(response);
                if(response.data.ret === 1) {
                    this.pages = Number(response.data.data);
                }
            },
        },

        async created() {
            await this.handleSearch(); // method호출하기
        }
    }
</script>

<style scoped>

</style>
