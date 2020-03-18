<template>
  <div></div>
</template>
<script>
export default {
  created() {
    // 空白页，判断cookie是否存在

    let token = false; //暂时写死
    if(token){

    }else{
        this.$router.push({name: 'login'})
    }
  }
};
</script>