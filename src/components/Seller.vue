<template>
    <div>
        <h3>판매자 페이지</h3>
        <h4 />
        <input type="button" @click="menu=1" value="물품일괄등록" />
        <input type="button" @click="handleSelect" value="등록한물품조회" />
        <input type="button" @click="menu=3" value="판매량분석" />
        <hr />

        <div v-if="menu === 1">
            <table>
                <tr v-for="num in count" v-bind:key="num">
                    <td>{{num}}</td>
                    <td><input type="text" v-model="name[num-1]" placeholder="물품명" class="sty1" /></td>
                    <td><input type="text" v-model="text[num-1]" placeholder="물품내용" class="sty1" /></td>
                    <td><input type="text" v-model="price[num-1]" placeholder="물품가격"  class="sty1"/></td>
                    <td><input type="text" v-model="quantity[num-1]" placeholder="물품수량"  class="sty1"/></td>
                    <td><input type="file" @change="handleImage($event, num-1)" accept="image/*" /></td>
                </tr>
            </table>   
            <input type="button" @click="count = count + 1" value="항목추가" />
            <input type="button" @click="handleMinus" value="항목삭제" />
            <input type="button" @click="handleInsert" value="일괄추가" />
        </div>

        <div v-else-if="menu === 2">
            <table>
                <tr v-for="(item, idx) in items" v-bind:key="item">
                    <td><input type="checkbox" v-model="chks" :value="idx"/></td>
                    <td><input type="text" v-model="item._id"  class="sty1"/></td>
                    <td><input type="text" v-model="item.name" class="sty1" /></td>
                    <td><input type="text" v-model="item.text" class="sty1" /></td>
                    <td><input type="text" v-model="item.price" class="sty1" /></td>
                    <td><input type="text" v-model="item.quantity" class="sty1" /></td>
                    <td><input type="button" @click="handleUpdateImage(item._id)" value="이미지" /></td>
                </tr>    
            </table> 
            <el-pagination background layout="prev, pager, next" 
                    :total="pages" 
                    @current-change="handleCurrentChange"></el-pagination>   
            <input type="button" @click="handleDelete" value="일괄삭제" />
            <input type="button" @click="handleUpdate" value="일괄수정" />
        </div>    

        <div v-else-if="menu === 3">

        </div>    


        <el-dialog title="이미지" v-model="dialogVisible">
            <img :src="`/api_seller/image?code=${code}&ts=${new Date()}`"
                    style="width:50px;height:50px" />
            메인이미지 변경용<input type="file" 
                @change="handleImage1($event, 0)" />     
            <hr />

            <div v-for="num in 3" v-bind:key="num">
                서버이미지{{num}} : 
                <input type="file" @change="handleImage1($event, num)" />
            </div>
            <hr />

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleSave">저장하기</el-button>
                </span>
            </template>
        </el-dialog>

    </div>



</template>

<script>
    import axios from 'axios';

    export default {
        methods : {
            async handleSave(){
                // 메인 이미지 변경
                const url = `/api_seller/imageupdate?code=${this.code}`;
                const headers = { "Content-Type" : "multipart/form-data" };
                const body = new FormData();
                body.append("image", this.img[0]);
                // 변경할 이미지는 this.img[0]
                const result = await axios.put(url, body, {headers});
                console.log(result);

                // 서버 이미지 추가
                const url1 = `/api_seller/image1?code=${this.code}`;
                const headers1 = {"Content-Type" : "multipart/form-data"};
                const body1 = new FormData();
                body1.append("image", this.img[1]);
                body1.append("image", this.img[2]);
                body1.append("image", this.img[3]);
                const result1 = await axios.post(url1, body1, {headers1});
                console.log(result1);


                // 다이어로그 숨기기
                this.dialogVisible = false
            },


            async handleUpdateImage(code){
                console.log(code);
                this.code = code;
                // 다이얼로그 띄우기
                this.dialogVisible = true;
            },

            async handleUpdate() {
                const ret = confirm('정말 수정 할까요?');

                if(ret) {
                    const url = `/api_seller/update`;
                    const headers = { "Content-Type" : "application/json" };

                    var code        = [];
                    var name        = [];
                    var text        = [];
                    var price       = [];
                    var quantity    = [];
                    for(let i=0; i<this.chks.length; i++) {
                        const idx = this.chks[i]; // 체크된 위치
                        code.push( this.items[idx]._id );
                        name.push( this.items[idx].name );
                        text.push( this.items[idx].text );
                        price.push( this.items[idx].price );
                        quantity.push( this.items[idx].quantity );
                    }

                    const body = {
                        code:code,
                        name:name,
                        text:text,
                        price:price,
                        quantity:quantity,
                    }

                    const response = await axios.put(url, body, {headers});
                    console.log(response);
                    if(response.data.ret === 1) {
                        await this.handleSelect();
                        this.chks = []; // 체크박스 전체 해제
                    }
                }    
            },

            async handleDelete() {
                const ret = confirm('정말 삭제 할까요?');
                if(ret) {
                    // chks => [ 0, 2, 1 ]
                    var arr = [];
                    for(let i=0;i<this.chks.length; i++) {
                        const idx = this.chks[i]; // 0번째, 2번째, 1번째
                        arr.push(this.items[idx]._id);
                    }

                    const url = `/api_seller/delete`;
                    const headers = { "Content-Type" : "application/json" };
                    const data = { code: arr };

                    //{data: {code:arr}} {headers:{ "Content-Type" : "application/json" }}
                    const response = await axios.delete(url, {data:data}, {headers:headers});
                    // const response = await axios.delete(url, {data:data,headers:headers});
                    console.log(response);
                    if(response.data.ret === 1) {
                        await this.handleSelect();
                    }
                }
            },

            async handleCurrentChange(val) {
                this.page = val;
                await this.handleSelect();
            },



            async handleSelect(){
                // 메뉴2로 변경
                this.menu = 2;

                // node에서 데이터 받기
                const url = `/api_seller/select?page=${this.page}&name=`;
                const headers = { "Content-Type" : "application/json" };
                const response = await axios.get(url, {headers});
                console.log(response);
                if(response.data.ret === 1){
                    // 받은 데이터 items변수에 넣기
                    this.items = response.data.data;
                }
            },

            async handleInsert() {
                const url = `/api_seller/insert`;
                const headers = { "Content-Type" : "multipart/form-data" };
                const body = new FormData();
                for(let i=0; i<this.count; i++) {
                    body.append("name", this.name[i])
                    body.append("text", this.text[i])
                    body.append("price", this.price[i])
                    body.append("quantity", this.quantity[i])
                    body.append("image", this.image[i])
                }
                console.log(body);

                const response = await axios.post(url, body, {headers});
                console.log(response);
                if(response.data.ret === 1){
                    alert(response.data.data);
                }
            },

            handleMinus(){
                this.count = this.count - 1;
                if(this.count < 1) {
                    this.count = 1;
                }
            },

            handleImage(e, idx){
                console.log(e);
                console.log(idx);

                if(e.target.files.length > 0) { //파일첨부여부 확인
                    this.image[idx] = e.target.files[0];
                }
            },

            handleImage1(e, idx){
                if(e.target.files.length > 0) { //파일첨부여부 확인
                    this.img[idx] = e.target.files[0];
                } 
            }
        },
        data() {
            return {
                menu        : 1,
                count       : 2,
                name        : ['a','b'],
                text        : ['a1','b1'],
                price       : [100,200],
                quantity    : [90,99],
                image       : [], 

                items       : [],
                page        : 1,   // 처음시작 페이지 번호
                pages       : 100, // 전체 물품수 임의의로 100

                chks          : [],  // 체크박스의 체크된 위치(0부터시작)
                dialogVisible : false,  // 다이얼로그 표시유무
                code          : 0,      // 이미지 클릭시 저장되는 코드값

                img         : [],   // 메인이미지, 서브이미지3개 보관
            }
        }
    }
</script>

<style scoped>
    .sty1 {
        width:70px;
    }
</style>
