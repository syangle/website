<template>
<!-- 我们的产品 -->
    <div class="product">
        <div>
             <h3 class="product-title">App</h3>
            <ul>
                <router-link 
                    v-for="data in datalist"
                    :key="data.id"
                    :to="{
                        name:'linju',
                        params:{id:data.id},
                    }"
                    v-show="data.type==1"
                    tag="li"
                >
                   <h3>{{data.name}}</h3> 
                </router-link>
            </ul>
        </div>
        <div>
             <h3 class="product-title">小程序</h3>
            <ul>
                <router-link
                    v-for="data in datalist"
                    :key="data.id"
                    :to="{
                        name:'linju',
                        params:{id:data.id},
                    }"
                    :class="data.name"
                    v-show="data.type==2"
                    tag="li"
                >
                   <h3>{{data.name}}</h3>
                   <!-- <img :src="updateUrl + data.image" alt=""> -->
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import {getSystemProduct} from '@/axios/api'
export default {
    data() {
        return {
            datalist:[],
            updateUrl:"http://admin.abram.xin/upload/", //请求图片的url前缀
        }
    },
    mounted(){
        this.getproduct()
    },
    methods:{
        async getproduct(){
            let res = await getSystemProduct()
            console.log(res)
            if (res.data) {
                this.datalist = res.data
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .product{
         margin-top: 49px;
         padding: 18px;
         padding-top: 0;
        .product-title{
            font-size: 25px;
            padding: 22px 0 20px;
            margin: 0;
            color: #2f2f2f;
            font-weight: normal;
        }
        ul,li{
            list-style: none;
            padding: 0;
            margin: 0;
        }
        li{
            font-size: 28px;
            background-image:url("../assets/APP.png") ;background-repeat:no-repeat;background-size:cover;-moz-background-size:cover;-webkit-background-size:cover;
            // position: relative;
            h3{
                text-align: center;
                font-size: 20px;
                line-height: 118px;
                font-weight:bold;
                color:rgba(52,52,52,1);
                margin: 0;
                // position: absolute;
                // left: 42%;
                // top: 42%;
            }
            padding: 7px 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .领居生鲜{background-image:url("../assets/生鲜.png") ;background-repeat:no-repeat;background-size:cover;-moz-background-size:cover;-webkit-background-size:cover;}
        .领居社区{background-image:url("../assets/社区.png") ;margin-top: 20px;background-repeat:no-repeat;background-size:cover;-moz-background-size:cover;-webkit-background-size:cover;}
        .领居家装{background-image:url("../assets/家装.png") ;margin-top: 20px;background-repeat:no-repeat;background-size:cover;-moz-background-size:cover;-webkit-background-size:cover;}
    }
</style>