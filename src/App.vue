<template>
    <div>

        <el-container>
          <el-header>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">홈으로</el-menu-item>
              <el-menu-item index="2">게시판목록</el-menu-item>
              <el-menu-item index="3">게시판글쓰기</el-menu-item>

              <el-menu-item index="4">회원가입</el-menu-item>
                <el-menu-item index="5">로그인</el-menu-item>
                   <el-menu-item index="6">마이페이지</el-menu-item>
            </el-menu>
          </el-header>

          <el-main>
            <router-view></router-view>
          </el-main>

          <el-footer>
            <div style="border-top:1px solid #efefef;">
              Footer
            </div>
          </el-footer>
        </el-container>

    </div>
</template>

<script>
export default {
  methods:{
    handleSelect(val){
      if(val === '1'){
        this.$router.push({path:'/'})
      }
      else if(val === '2'){
        this.$router.push({path:'/menu1'})
      }
      else if(val === '3'){
        this.$router.push({path:'/menu2'})
      }      
      else if(val === '4'){
        this.$router.push({path:'/join'})
      } 
       else if(val === '5'){
        this.$router.push({path:'/login'})
      } 
        else if(val === '6'){
        this.$router.push({path:'/mypage'})
      } 
      console.log(val);
    }
  }
}
</script>


<style>
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
  }


  .el-main {
    /* background-color: #E9EEF3; */
    color: #333;
    
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

