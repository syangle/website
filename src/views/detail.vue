<template>
<!-- 职位详情页 -->
    <div class="detail">
        <div class="position">
            <h3>{{jobdetail.job}}</h3>
            <div class="icon">
                <p class="shezhao"><img src="@/assets/社招.png" alt=""> {{jobdetail.city_name}}</p> 
                <p class="address"><img src="@/assets/城市.png" alt="">{{jobdetail.city_name}}</p> 
                <p><img src="@/assets/研发.png" alt="">{{jobdetail.type_name}}</p>
            </div>

            <div>
                <h4>职位描述</h4>
                <ul class="desc">
                    <li v-html="jobdetail.job_desc">{{jobdetail.job_desc}}</li>
                </ul>
                <h4>职位需求</h4>
                <ul class="desc need">
                     <li v-html="jobdetail.job_need">{{jobdetail.job_need}}</li>
                </ul>
                <div class="bottom" @click="handleSubmit(0)">投递简历</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { DatetimePicker,Popup,Toast} from 'vant';
import {getSystemSend,getSystemDetails,getUploadFile} from '@/axios/api'
import upLoaderImg from '@/axios/upLoaderImg'
Vue.use(Toast);
Vue.use(DatetimePicker);
Vue.use(Popup);
export default {
    data(){
        return{
            errMsg: {
                mobilePhone: ''
            },
            jobdetail:{},
            isShow:true,
            isSubmit:true,
            fileList:[],
            fileData:'',
            ruleForm:{  
                name: '',
                mobile: '',
                email: '',
                school: '',
                record: '',
                major: '',
                value: '',
            },
            updateUrl: "http://admin.abram.xin/api/job/upload_file",
            showCalendar: false,
            message:'',
            startTime: new Date(), // 开始时间
            endTime: new Date(), // 结束时间
            datePicker: '', // 用于判断哪个选择器的显示与隐藏
            isPopShow: false, // 弹出层隐藏与显示
            avatar:'',
            cvFile:"" , //上传简历
            detailId:"",//传的详情id
        }
    },  
     mounted(){
        if (this.$route.params.id) {
            this.detailId = this.$route.params.id
        }
        this.getDetail()
    },
    methods:{
        handleSubmit(index){
            this.$router.push({name:"post",params:{id:this.detailId}})
        },
        async getDetail(){
            let resData = await getSystemDetails({id:this.detailId})
            this.jobdetail = resData.data[0]
        },
    }
}

</script>
<style>
 .van-cell--required::before{
     left: 40px;
 }
 .date .van-cell--required::before{left:60px}
</style>
<style lang="scss" scoped>
.detail{ margin-top: 20px;}
    .position{
        margin-top:49px;
        padding: 0 15px;
        h3{
            padding: 19px 0 0 18px;
            margin:0;
            height: 25px;
            color: rgba(16, 16, 16, 1);
            font-size: 18px;
            font-family: PingFangSC-bold;
        }
        .icon{
            display: flex;
            img{
                width: 15px;
                height: 15px;
                margin-right: 8px;
            }
        }
        p{
            margin: 13px 0;
            height:17px;
            color: rgba(16, 16, 16, 1);
            font-size: 12px;
            font-family: PingFangSC-regular;
        }
        .shezhao{margin:13px 0 13px 18px;}
        .address{margin: 13px 23px;}

        h4{
            width: 60px;
            height: 20px;
            color: rgba(16, 16, 16, 1);
            font-size: 14px;
            font-family: PingFangSC-bold;
            margin: 12px 18px ;
        }
        .desc{
            min-height: 65px;
            color: rgba(16, 16, 16, 1);
            font-size: 14px;
            font-family: PingFangSC-regular;
            padding-right: 18px;
            li{
                width: 100%;
                padding: 0 18px 5px;
            }
            li /deep/ p:last-child{margin: 0;height: 0;}
        }
        .need{
            margin-bottom: 50px;
            li /deep/ p:last-child{margin: 0;height: 0;}
        }
        .time{
            display: flex;
            .item{font-size: 14px;}
            span{color: #ee0a24;}
            .time-btn{ margin-left: 20px;padding-top: 15px;
                .start-btn,.end-btn{
                    border: none;font-size: 12px;
                    background: #fff;color: #969799;margin-right: 5px;
                }
            }
        }
    }
    .bottom{
        position: fixed;
        bottom: 0;left: 0;
        width: 100%;
        height:54px;
        line-height: 54px;
        background-color: rgba(0, 0, 0, 1);
        color: rgba(248, 248, 248, 1);
        font-size: 14px;
        text-align: center;
        font-family: Arial;
        border: 1px solid rgba(255, 255, 255, 0);
    }
    .message{
        padding-left: 18px;
        h3{
            padding: 0;
            margin: 0;
            margin-top:16px;
            height:14px;
            font-size:14px;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:18px;
        }
        .line{
            height:2px;
            background:rgba(102,102,102,1);
            border-radius:80px;
            width: 56px;
            margin-top: 6px;
            line-height: 20px;
            border: 1px solid rgba(255, 255, 255, 0);
        }
        
        .xueli{
            width: 98px;
            height:12px;
            font-size:12px;
            color:rgba(119,119,119,1);
            line-height:18px;
        }
    }
    .last{
        .line{width: 22px;}
    }
    .van-cell{
        padding: 0;
    }
    .van-form{
        .item{
            margin-top: 18px;
        }
        // .van-cell::after{border: none;}
    }
    .last{
        margin-bottom: 60px;
    }
    .text{
        width: 332px;
        height: 194px;
        line-height:20px;
        border-radius: 5px;
        color: rgba(136, 136, 136, 1);
        font-size: 14px;
        font-family: Microsoft Yahei;
        border: 1px solid rgba(187, 187, 187, 1);
        margin-top: 15px;
    }
    .jianli{
        width: 331px;
        height: 164px;
        line-height: 20px;
        border-radius: 5px;
        background-color: rgba(248, 248, 248, 1);
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0);
        margin: 24px 0 120px;
        .filepic{
            width: 45px;
            height: 45px;
            margin-top: 34px;
        }
        p{
            height: 14px;
            line-height: 18px;
            color:rgba(51,51,51,1);
            font-size: 14px;
            text-align: center;
        }
        .geshi{
            height: 11px;
            color:rgba(51,51,51,1);
            font-size: 10px;
            line-height: 18px;
            text-align: center;
        }
    }
    .subSuccess{
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 10;
        .success-desc{
            position: relative;
            top: 71px;
            left: 81px;
            width: 213px;
            height: 182px;
            line-height: 20px;
            border-radius: 10px;
            background-color: rgba(248, 248, 248, 1);
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0);
        
            p{  
                margin: 90px 0 0 72px;
                width: 68px;
                height: 14px;
                color: rgba(16, 16, 16, 1);
                font-size:12px;
                text-align: center;
                font-family: SourceHanSansSC-bold;
            }
            div{
                margin: 15px 0 0 47px;
                width: 118px;
                height: 37px;
                color: rgba(16, 16, 16, 1);
                font-size:12px;
                text-align: center;
                font-family: SourceHanSansSC-regular;
            }
        }
        .success-btn{
            margin-top: 100px;
            margin-left: 81px;
            width: 213px;
            height: 55px;
            line-height: 20px;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 1);
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            text-align: center;
            font-family: Arial;
            border: 1px solid rgba(255, 255, 255, 0);
        }
    }
    
  
</style>