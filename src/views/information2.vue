<template>
    <div>
        <div class="content">
            <h3>新闻资讯</h3>
            <!-- <ul class="detail">
                <router-link
                    v-for="data in datalist"
                    :key="data.id"
                    :to="{
                        name:'news',
                        params:{id:data.id}
                    }"
                    tag="li"
                >   
                    <img :src="data.image" alt="">
                    <h3 class="news-title">{{data.title}}</h3>
                    <p>{{data.content}}</p>
                </router-link>
            </ul> -->
 
            <ul class="detail">
                <router-link 
                   :to="{name:'news',params:{id:2}}" 
                >
                    <li>
                        <img src="" alt="">
                        <h3 class="news-title">唐人泛家装｜对家居服务的反思</h3>
                        <p>
                            家居服务应该是家居企业非常认真对待，并且不遗余力认真做好的一件事。我们看到不在少数的家居企业都说自己企业的核心竞争力，就在自己的产品服务商发展对线下传统经销渠道进行严重侵袭时，大家又都认为传统家居经销商还是有价值的，这个价值就是家居服务。我们甚至把这样的家居服务称之为传统
                            经销渠道抵御线上电商侵袭的“护城河”，而且坚信未来家居经销商会转变成为服务商。
                        </p>
                    </li>
                </router-link>
               
            </ul>
        </div>        
    </div>
</template>

<script>
// import service from "@/utils/http"
import Vue from 'vue'
import {getSystemNewList} from "@/axios/api"
export default {
    data(){
        return {
            datalist:[],
        }
    },
    mounted(){
        this.getnewlist()
    },
    methods:{
        async  getnewlist(){
            let res = await getSystemNewList({page:2})
            console.log(res)
            if (res.data) {
                this.datalist = res.data.data
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .content{
        margin-top: 49px;
        padding: 12px 22px 0 16px;
        h3{
            font-size: 20px;
            line-height: 1;
            color: #131313;
            margin: 8px 0 14px;
        }
        img{
            width:343px;
        }
        .news-title{
            margin: 0;
            height:18px;
            font-size:16px;
            color:rgba(51,51,51,1);
            line-height:18px;
            font-weight: 300;
        }
        p{
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:300;
            color:rgba(102,102,102,1);
            line-height:18px;
        }
        .detail .newslist{
            padding: 0;
        }
    }
</style>