<template>
<!-- 我们的产品详情页 -->
    <div class="product-detail">
        <div 
             v-for="item in datalist" 
            :key="item.id"
            v-show="item.id == $route.params.id"
        >
            <div class="pic">
                <img  :src="updateUrl + item.logo" alt="">
            </div>
            <h3 class="title">{{item.name}}</h3>
            <p class="desc">{{item.content}}</p>
            <!-- <div class="more">
                <p>更多信息，请访问：</p>
                <p class="lianjie">http://www.linju.com</p>
            </div> -->
        </div>
        <div class="arrows"><img @click="handleback" src="@/assets/移动端上.png" alt=""></div>
    </div>
</template>

<script>
import {getSystemProduct} from '@/axios/api'
export default {
    props:["id"],
    data() {
        return {
            datalist:[],
            islingju:false,
            updateUrl:"http://admin.abram.xin/upload/", //请求图片的url前缀
        }
    },
    mounted(){
        this.getdatalist()
    },
    methods:{
        async  getdatalist(){
            let res = await getSystemProduct()
            console.log(res)
            if (res.data) {
                this.datalist = res.data
            }
        },
        handleback(){
            this.$router.back()
        }
    }
 
}
</script>

<style lang="scss" scoped>
    .product-detail{
        margin-top: 49px;
        padding:20px;
        color:rgba(51,51,51,1);
        .pic{
            margin-top: 48px;
            width: 81px;
            height: 81px;
            img{
                width:100%;
                height:100%;
            }
        }
        .title{
            width: 100px;
            height: 28px;
            font-size: 20px;
            margin: 21px 0;
        }
        .desc{
            font-size: 14px;
            line-height:21px;
        }
        .more{
            p{
                height: 20px;
                font-size: 14px;
                margin: 38px 0 8px;
            }
            .lianjie{
                margin: 0;
                color: rgba(153, 153, 153, 1);
            }
        }
        .icon{
            position: fixed;
            bottom:10px;
            left: 175px;
            img{
                width: 24px;
                height: 24px;
            }
        }
        .product{
            width: 100%;
            overflow: hidden;
            position: relative;
            img{
                margin-left: -90px;
                margin-top: -16px;
                height: 100%;
            }
            p{
                position: absolute;
            }
        }
        .arrows{
            position: fixed;
            bottom: 16px;
            left: 45%;
        }
    }
</style>
