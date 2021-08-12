<template>
    <div>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        async created(){
            if(this.token !== null){
                const url = `/api_seller/orderlist`;
                const headers = { 
                    "Content-Type" : "application/json", 
                    "token" : this.token 
                };
                const response = await axios.get(url, {headers});
                console.log("======================");
                console.log(response);
                console.log("======================");
            }
        },

        data() {
            return {
                token : sessionStorage.getItem("TOKEN"), 
                items : [],
            }
        }
    }
</script>

<style scoped>

</style>