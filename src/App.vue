<template>
  <div id="app">
    <HeadMenu></HeadMenu>
    <router-view></router-view>
  </div>
</template>
<script>
import HeadMenu from "@/components/headMenu"
export default {
  components:{
    HeadMenu
  },
     mounted(){
        function goPAGE() {
            //如果不符合任何手机机型，则判断为是pc端
            if(!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
               window.location.href="https://abram.xin";
               console.log('pc端') 
            }
        }
        goPAGE();
     }
}
</script>
<style>

</style>
<style lang="scss">

</style>
