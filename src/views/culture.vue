<template>
    <div>
        <div class="content">
            <h3>我们的观点</h3>
            <div 
                 v-for="item in societylist"
                :key="item.id"
            >
                <img :src="updateUrl + item.image" alt="">
                <h4>{{item.title}}</h4>
                <p class="desc">{{item.content}}</p>
                <div class="dot">
                    &lt;<p>...</p>&gt;
                </div>
            </div>
         
        </div>

        <div class="content">
            <h3>企业社会责任</h3>
              <div 
                 v-for="item in manage"
                :key="item.id"
            >
                <img :src="updateUrl + item.image" alt="">
                <h4>{{item.title}}</h4>
                <p class="desc">{{item.content}}</p>
                <div class="dot">
                    &lt;<p>...</p>&gt;
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import service from "@/utils/http"
import {getSystemArtice} from "@/axios/api"
import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
export default {
    data(){
        return {
            active:0,
            updateUrl:"http://admin.abram.xin/upload/", //请求图片的url前缀
            societylist:[],
            manage:[],
        }
    },
    mounted(){
       this.getSystemArtice()
    },
    methods:{
         async getSystemArtice(){
            let res = await getSystemArtice()
            console.log(res)
            if (res.data) {
                this.societylist = res.data.society
                this.manage = res.data.manage
            }
        
        }
    }
    
}         
</script>
<style>
.van-tabs--line .van-tabs__wrap{
    height: 44px;
    position: absolute;
    bottom: -50px;
    left: 30%;
}
.van-tabs__nav .van-tabs__line{
    background-color: #fff;
}
</style>
<style lang="scss" scoped>
.content{
         margin-top: 49px;
         padding: 16px;
         padding-top: 0;
    h3{
        height:20px;
        font-size:20px;
        color:rgba(51,51,51,1);
        line-height:17px;
        padding: 20px 0 15px;
        margin: 0;
    }
   
    h4{
        font-size:14px;
        line-height: 1;
        margin:19px 0 15px;
        color: #3c3c3c; font-weight: normal;
    }
    p{
        margin: 0;
        font-size:14px;
        color:rgba(51,51,51,1);
        line-height:18px;
    }
    img{
        width:100%;
        height:191px;
    }
    .dot{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 86px;
        height: 14px;
        margin:25px auto 45px;
        font-size: 30px;
        p{margin: 0 6px;
            width: 70px;
            text-align: center;
            font-size: 14px;
        }
    }
    .jiantou{
        display: flex;
        align-items: center;
        height: 60px;
        img{
            width: 10px;
            height:14px;
        }
        .left{
            margin-left: 92px;
        }
        .right{margin-left: 95px;}
    }
}

</style>