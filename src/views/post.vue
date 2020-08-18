<template>
<!-- 投递简历页 -->
    <div class="detail">
        <div class="position">
            <h3>{{jobdetail.job}}</h3>
            <div class="icon">
                <p class="shezhao"><img src="@/assets/社招.png" alt=""> {{jobdetail.city_name}}</p> 
                <p class="address"><img src="@/assets/城市.png" alt="">{{jobdetail.city_name}}</p> 
                <p><img src="@/assets/研发.png" alt="">{{jobdetail.type_name}}</p>
            </div>
          
                <div class="message">
                    <h3>基础信息</h3>
                    <div class="line"></div>
                    <van-form>
                        <van-field
                            class="item"
                            v-model="ruleForm.name"
                            label="姓名"
                            name="姓名"
                            placeholder="请输入" required
                        />
                        <van-field
                            class="item"
                            v-model.trim="ruleForm.mobile"
                            label="手机"
                            type="digit"
                            placeholder="请输入" required
                        />
                          <van-field
                            class="item"
                            v-model="ruleForm.email"
                            name="邮箱"
                            label="邮箱"
                            placeholder="请输入" required
                        />
                    </van-form>
                </div>

                <div class="message">
                    <h3>教育经历</h3>
                    <div class="line"></div>
                    <p class="xueli">请填写最高学历</p>
                    <van-form>
                        <van-field
                            class="item"
                            v-model="ruleForm.school"
                            label="学校"
                            name="学校"
                            placeholder="请输入"
                            required
                        />
                        <van-field
                            class="item"
                            v-model="ruleForm.record"
                            name="学历"
                            label="学历"
                            placeholder="请输入" required
                        />
                          <van-field
                            class="item"
                            v-model="ruleForm.major"
                            label="专业"
                            placeholder="请输入" required
                        />
                       
                        <!-- 起止时间 -->
                        <div class="time">
                            <p class="item">起止时间 <span>*</span></p>
                            <!-- 按钮区域 -->
                            <div class="time-btn">
                                <button ref="startTime" @click="showDatePicker('startTime')" class="start-btn">开始时间</button>至
                                <button ref="endTime" @click="showDatePicker('endTime')" class="end-btn">结束时间</button>
                            </div>
                            <!-- 弹出层 -->
                            <van-popup v-model="isPopShow" position="bottom">
                                <!-- 开始时间 -->
                                <van-datetime-picker
                                    @cancel="cancelPicker"
                                    @confirm="confirmPicker"
                                    v-if="datePicker == 'startTime'"
                                    v-model="startTime"
                                    type="date"
                                    :formatter="formatter"
                                />
                                <!-- 结束时间 -->
                                <van-datetime-picker
                                    @cancel="cancelPicker"
                                    @confirm="confirmPicker"
                                    v-if="datePicker == 'endTime'"
                                    v-model="endTime"
                                    type="date"
                                    :formatter="formatter"
                                />
                            </van-popup>
                        </div>
                    </van-form>
                </div>

                <!-- 自我评价 -->
                <div class="message">
                    <h3>自我评价</h3>
                    <div class="line"></div>
                    <!-- 输入任意文本 -->
                    <van-field
                        class="text"
                        v-model="message"
                        rows="1"
                        autosize
                        type="textarea"
                        placeholder="请输入"
                    />
                </div>

                <!-- 简历 -->
                <div class="message last">
                    <h3>简历</h3>
                    <div class="line"></div>
                    <div class="jianli">
                        <van-uploader multiple v-model="fileList" 　:after-read="afterRead" :before-read="beforeRead" :max-size="7 * 1024 * 1024" accept=".pdf,.doc,.docx">
                            <img class="filepic" src="@/assets/文件.png" alt="">
                        </van-uploader>
                        <p>请上传您的简历</p>
                        <p class="geshi">支持格式：pdf、doc、docx、</p>
                    </div>
                </div>
                <div class="bottom" @click="handleSubmit(1)">提交简历</div>
           

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
        // service.post("/api/job/job_detail",{id:this.$route.params.id}).then(res=>{
        //     this.jobdetail = res.data.data[0]
        // })
        if (this.$route.params.id) {
            this.detailId = this.$route.params.id
        }
        this.getDetail()
    },
    methods:{
        async  handleSubmit(index){
                let form = {...this.ruleForm}
                var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;//邮箱账号验证
                let data = {
                    job_id: this.jobdetail.id,
                    name: form.name,
                    mobile: form.mobile,
                    email: form.email,
                    school: form.school,
                    record: form.record,
                    major: form.major,
                    start_time: this.startTime,
                    end_time: this.endTime,
                    cv:this.cvFile
                };
                if(form.name && form.mobile && form.email && form.school && form.record && form.major && this.startTime && this.endTime){
                    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(form.mobile))){ 
                
                        Toast.fail('手机号码有误')
                        return false
                    } 
                    if (!(myreg).test(form.email)) {
                        Toast.fail('邮箱输入有误')
                        return false
                    }
                    let res = await getSystemSend(data)
                    console.log(res,"res")
                    if (res.code == 200) {
                        this.$router.push('/subsuccess')
                    }else {
                        Toast.fail(res.msg)
                    }
                }else{
                    Toast('提交失败,必填项不能为空');
                }
    },
        async getDetail(){
            let resData = await getSystemDetails({id:this.detailId})
            console.log(resData)
            this.jobdetail = resData.data[0]
        },
         showDatePicker(picker) { //弹出层并显示时间选择器
            this.isPopShow = true;
            this.datePicker = picker;
        },
        cancelPicker() { // 选择器取消按钮点击事件
            this.isPopShow = false;
            this.datePicker = "";
        },
        confirmPicker(value) {// 确定按钮，时间格式化并显示在页面上
            var date = value;
            var m = date.getMonth() + 1;
            var d = date.getDate();
            if (m >= 1 && m <= 9) {
                m = "0" + m;
            }
            if (d >= 0 && d <= 9) {
                d = "0" + d;
            }
            var timer = date.getFullYear() + "-" + m + "-" + d
            this.$refs[this.datePicker].innerHTML = timer;
            this.isPopShow = false;
            this.datePicker = "";
        },
        formatter(type, value) {// 格式化选择器日期
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            }
            return value;
        },

     

        async afterRead (file) {
            console.log(file,"22")
            let data = {
                cv:file.file
            }
            let res = await upLoaderImg(file.file)
            console.log(res.data)
            this.cvFile = res.data.cv 
            Toast.fail(res.msg)
            // console.log(this.cvFile,"this.cvFile")
        },
        beforeRead (file) {
            const isLt2M = file.size / 1024 / 1024 < 7;
            console.log(file, "file");
            if (!isLt2M) {
                Toast.fail("上传文件大小不能超过 7MB!");
            }
            this.fileData = file
            return true;
        }




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
            width: 319px;
            min-height: 65px;
            color: rgba(16, 16, 16, 1);
            font-size: 14px;
            font-family: PingFangSC-regular;
            li{
                width: 100%;
                margin: 0 0 5px 18px;
            }
        }
        .need{margin-bottom: 50px;}
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
        padding:0 16px;
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
        height: 194px;
        line-height:20px;
        border-radius: 5px;
        color: rgba(136, 136, 136, 1);
        font-size: 14px;
        border: 1px solid rgba(187, 187, 187, 1);
        margin-top: 15px;
     
    }
    .jianli{
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