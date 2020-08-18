<template>
<!-- 新闻详情页 -->
    <div class="news">
            <h4 class="title">{{descList.title}}</h4>
            <img :src="updateUrl + descList.image" alt="">
            <p v-html="descList.content">{{descList.content}}</p>
    </div>
</template>

<script>
import {getSystemNewDetail} from "@/axios/api"
export default {
    data(){
        return {
            descList:{},
            updateUrl:"http://admin.abram.xin/upload/", //请求图片的url前缀
        }
    },
    mounted(){
        this.getnewslist()
    },
    methods: {
        handleBack(){
            this.$router.back()
        },
        async getnewslist(){
            let res = await getSystemNewDetail(this.$route.params.id)
            console.log(res)
            if(res.data){
                this.descList = res.data
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .news{
        margin-top: 49px;
        padding: 0 16px;
        h3{
            height: 25px;
            color: rgba(16, 16, 16, 1);
            font-size: 18px;
            margin-bottom: 20px;
            font-family: PingFangSC-bold;
        }
        h4{
            height:23px;
            font-size:20px;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:17px;
            margin: 20px 0 12px;
        }
        p{
            font-size:12px;
            font-family:Microsoft YaHei;
            color:rgba(51,51,51,1);
            line-height:18px;
        }
    }
</style>