<template>
    <div>
        <!-- 首页 -->
        <div class="banner">
            <Swiper cName="swipe">
                <div class="swiper-slide"
                    v-for="(item,index) in banners"
                    :key="item.id"
                    v-swiper="{
                        current:index,
                        length:banners.length,
                        swipe:'swipe'
                    }"
                >
                    <img :src='updateUrl + item.image' >
                </div>
            </Swiper>
        </div>
        <div class="content">
             <!-- 企业文化 -->
            <div class="culture" id="componeny">
                <h3 class="title-culture">企业文化</h3>
                <p class="culture-desc">{{cultureDesc}}</p>
            </div>
            <div class="culturepic">
                <Swiper cName="swipe">
                    <div class="swiper-slide"
                        v-for="(item,index) in cultures"
                        :key="item.id"
                        v-swiper="{
                            current:index,
                            length:cultures.length,
                            swipe:'swipe'
                        }"
                    >
                        <img :src='updateUrl + item.image' >
                    </div>
                </Swiper>
            </div>        

           <!-- 大事记 -->
            <div class="culture" id="big-things">
                <h3 class="title-culture">时间线</h3>
                <div class="big-things">
                    <div 
                        class="thing-content"
                          v-for="item in bigpics"
                          :key="item.id"
                    >
                        <h4 class="things-title">
                            <p class="circle-title"><img  :src="updateUrl + item.logo" alt=""></p>
                        </h4>
                        <ul class="things-detail">
                            <li class="bigpic">
                                <img  :src="updateUrl + item.image" alt="">
                            </li>
                        </ul>
                    </div>
                </div> 
            </div>

            <!-- 我们的产品 -->
            <div class="product" @click="handleClick">
                <h3 class="title-culture">我们的产品 <span class="arrow">&gt;</span> </h3>
            </div>

            <!-- 联系我们 -->
            <div class="connect" id="connect">
                <h3 class="title-culture">联系我们</h3>
                <ul>
                    <li>
                        <p>媒体问询</p>
                        <span>{{bottomlist.media_email}}</span>
                    </li>
                    <li>
                        <p>商务合作</p>
                        <span>{{bottomlist.bd_email}}</span>
                    </li>
                </ul>
            </div>

        
            
        </div>

        <!-- 底部栏 -->
            <div class="bottom">
                <!-- <div class="bottom-logo"><img src="@/assets/亚伯兰.png" alt=""></div> -->
                <div>
                    <p class="b-num">备案号：{{bottomlist.icp}}</p>
                    <p class="b-r">© 2020 上海亚伯兰电子商务有限公司</p>
                </div>
            </div>
    </div>
</template>
<script>
// 引入Swiper组件
import Swiper from "@/components/Swiper"
// import service from "@/utils/http"
import {getSystemBanner,getSystemCulture,getSystemconfig,getSystemEvent} from "@/axios/api"
export default {
    components:{
        Swiper  //注册组件Swiper
    },
    data() {
        return {
            banners:[],
            cultures:[],
            updateUrl:"http://admin.abram.xin/upload/", //请求图片的url前缀
            bigpics:[],
            cultureDesc:"",
            bottomlist:"",
        }
    },
    mounted() {
        this.getBanner()
    },
    methods:{
        async getBanner(){
            let res = await getSystemBanner()
            if (res.data) {
                this.banners = res.data
            }
            let resData = await getSystemCulture() 
             if (resData.data) {
                  this.cultures = resData.data.image
                this.cultureDesc = resData.data.content
            }
             let resData1 = await getSystemEvent() 
             if (resData1.data) {
                this.bigpics = resData1.data
            }
             let resData2 = await getSystemconfig() 
             if (resData2.data) {
               this.bottomlist = resData2.data
            }
        },
        handleClick(){
            this.$router.push('/productlist')
        }
    }
}
</script>

<style lang="scss" scoped>
    .banner{
        margin-top:49px;
       .swiper-slide{
            img{
                width:100%
            }
        }
    }
    .content{
        padding: 15px;
        padding-top: 0;
        color: rgba(16, 16, 16, 1);
        .title-culture{
            font-size: 20px;
            line-height: 25px;
            height: 25px;
            padding:14px 0;
            margin: 0;
            .arrow{
                // margin-left: 20px;
                color: #666;
            }
        }
       p{
            font-size:14px;
            color:rgba(96,96,96,1);
            line-height:19px;
            margin-top: 0;
        }
        .culturepic{height: 220px;
            .swiper-container{
                width: 100%;
                height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .big-things{
             .thing-content{
                position: relative;
                margin-left: 12px;
                border-left: solid 1px #999;
            }
            .things-title{
                display: flex;
                margin: 0;
                margin-bottom: 10px;
                .circle-title{
               
                    width: 28px;
                    height: 28px;
                        position: absolute;
                        left: -13px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                span{
                    font-size: 14px;
                    line-height: 30px;
                    margin-left: 26px;
                }
                .xian{background: green;}
            }
            .things-detail{
                margin: 0 auto;
                width: 256px;
                height: 94px;
                border-radius: 10px 10px;
                .lingju{
                    display: flex;
                    h3{
                       border-radius: 10px 0 0 10px;
                        background: red;
                        width: 120px;
                        height: 94px;
                        line-height: 94px;
                        text-align: center;
                        margin: 0;
                        font-size: 40px;
                        color:#fff;
                    }
                    div{
                        padding: 6px;
                        display: flex;
                        flex-direction: column;
                    }
                    h4{
                        font-size: 14px;
                        height: 14px;
                        line-height: 18px;
                        color: #141414;
                        margin: 2px 0;
                    }
                    span{
                        font-size: 10px;
                        height: 10px;
                        line-height: 1;
                        color: #929292;
                    }
                    .xian{background: green;}
                   
                }
                 
            }
           
            .bigpic{
                        width:262px;
                        height:95px;
                        background:rgba(255,255,255,1);
                        // box-shadow:3px 3px 3px 0px rgba(0, 0, 0, 0.09), 0px -1px 0px 0px rgba(130,130,130,0.02);
                        // border-radius:14px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
        }

        .connect{
            ul,li{
                list-style: none;
                padding: 0;
                margin: 0;
            }
            li{
                font-size: 14px; 
                line-height: 1;
                padding:4px 0 7px;
                p{
                    height:14px;
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(51,51,51,1);
                    line-height:20px;
                    margin-bottom: 8px;
                }
                span{
                    height:16px;
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:300;
                    color:rgba(51,51,51,1);
                    line-height:20px;
                }
            }
        }
        .product{
            p{
                font-weight: bold;
                color: #333;
                font-family:Microsoft YaHei;
            }
        }
    }
    .bottom{
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        background: #000;
        color: #fff;
        justify-content: center;
        align-items: center;
        .b-r{
            font-size: 12px;
            text-align: center;
        }
        // .bottom-logo{
        //     width:68px;
        //     height:43px;
        //     margin:14px 0;
        //      img{
        //         display: block;
        //         height: auto;
        //         width: 100%;
        //     }
        // }
        .b-num{
            width: 350px;
            height:12px;
            font-size:12px;
            text-align: center;
            color:rgba(255,255,255,1);
            line-height:17px;
        }
    }
</style>