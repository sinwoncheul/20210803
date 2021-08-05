<template>
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
</template>

<script>
export default {
  name: '',
  props: {
    msg: String
  }
}
</script>


<style scoped>

</style>
