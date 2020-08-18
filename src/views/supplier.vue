<template>
<!-- 供应商申请页 -->
  <div class="content" style="background:#fff">
    <div v-if="!isSubmit">
        <div class="content-top">
            <h3>领居生鲜超市供货商申请表</h3>
            <p class="red">
              共努力，克时艰。为帮助解决疫情期间百姓生活物资短缺、采购难的问题，“领居家博汇”推出“领居生鲜超市”服务。现面向社会寻找货源，招募供
              应商合作伙伴，如您能够提供生鲜类、卫生类、家居类、母婴类、食品饮料类产品等任意货源，请填写下表，我们将以最快速度与您联系。
            </p>
        </div>


        <div class="box-mtForm"> 
          <p>联系人</p>   <mt-field placeholder="请输入" v-model="contacts"></mt-field>
          <p>联系方式</p>   <mt-field placeholder="请输入" v-model="mobile"></mt-field>
          <p>所在地区</p>   <div class="iptaddress" @click="showPopup">{{city || '请输入'}}</div>
          <van-popup v-model="show" position="bottom" :style="{ height: '40%' }" >  
              <van-area title="所在城市" :area-list="areaList" :value="area" @confirm="handleSure" @cancel="exit"/>
          </van-popup>
        </div>
   

        <div class="column">
            <div class="select">  
              <span class="select-header">01</span>
              <span class="select-one">所能供应货源</span>
              <span class="select-two">&nbsp;*</span>
              <span class="select-three">多选</span>
            </div>
        </div>
        <div class="checklist">
            <mt-checklist  v-model="value" :options="projectData" @change="checkon" ></mt-checklist>
        </div> 

        <div class="goods">
          <div class="select">
            <span class="select-header">02</span>
            <span class="select-one">货源主要品牌(如：双汇、飞鹤、金龙鱼、海飞丝等等)</span>
            <span class="select-two">*</span>
          </div>
        </div>
        <div class="textarea two-textarea">
          <mt-field type="textarea" rows="8" placeholder="请输入"  v-model="brand"></mt-field>
        </div>


        <div class="pic">
          <div class="select">
            <span class="select-header">03</span>
            <span class="select-one">货源实拍</span>
            <span class="select-two">*</span>
          </div>
          <div class="pic-sub">
              <van-uploader multiple v-model="picList"  :max-size="7 * 1024 * 1024" :after-read="afterReadImg" :before-read="beforeReadImg" accept=".jpg, .jpeg, .png">
                <p class="pic-btn">点击添加图片</p>
              </van-uploader>
              <!-- <h4>请上传您的货源实拍</h4> -->
              <p>支持格式：png、jpg、jpeg、gif、</p>
          </div>
        </div>

        <div class="bill">
          <div class="select">
            <span class="select-header">04</span>
            <span class="select-one">货源清单(含价格、库存)</span>
            <span class="select-two">*</span>
          </div>
          <div class="bill-sub">
              <van-uploader multiple v-model="fileList" :after-read="afterReadFile" :before-read="beforeReadFile" :max-size="7 * 1024 * 1024" accept=".pdf,.doc,.docx">
                  <span class="bill-btn">点击添加文件</span><span class="bill-desc">文件大小7MB以内</span> 
              </van-uploader>
              <p>支持格式：pdf、doc、docx、ppt、</p>
          </div>
        </div>


        <div class="partticulars">
          <div class="select">
            <span class="select-header">05</span>
            <span class="select-one">详细地址(具体至门牌号)</span>
            <span class="select-two">*</span>
          </div>
        </div>
        <div class="mt-address">
          <mt-field  placeholder="请输入" v-model="address"></mt-field>
        </div>


        <div class="else">
          <div class="select">
            <span class="select-header">06</span>
            <span class="select-one">其他信息详细说明</span>
            <span class="select-two">*</span>
          </div>
        </div>
        <div class="textarea">
          <mt-field type="textarea" rows="8" placeholder="请输入" v-model="desc"></mt-field>
        </div>
        <div class="bottom" @click="handleSubmit()">提交</div>
      
    </div>

     <div class="subSuccess" v-if="isSubmit">
            <div class="success-desc">
                <p>提交成功</p>
                <div>请耐心等待 保持联系方式畅通 </div>
            </div>
            <button class="success-btn" @click="handleBack">返回首页</button>
      </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Field,Checklist } from 'mint-ui';
import service1 from "@/utils/http"
import {getJobSuppy,getUploadGoodsFile,getUploadGoodsImg} from '@/axios/api'
import { DatetimePicker,Popup,Toast,Area,Cell} from 'vant';

import areaFile from '@/assets/js/areaList.js'

Vue.use(Toast);
Vue.use(Cell);
Vue.use(Area);
Vue.use(Popup);
Vue.component(Checklist.name, Checklist);
export default {
  components:{
    Field
  },
  data(){
    return{
      show: false,
      text:"",
      contacts: "",
      picList:[],
      fileList:[],
      fileData:"",
      mobile: "",
      selectData: [],
      value:[],
      brand:'',
      address:"",
      desc:'',
      goods:'',
      isSubmit:false,
      projectData: [
        {
          label: "生鲜瓜果(如:瓜果蔬菜、猪鸡羊牛肉、海鲜水产等等)",
          value: "1"
        },
        {
          label: "卫生防范(如:家庭常备、计生用品、检测器材、口罩等等)",
          value: "2"
        },
        {
          label: "食品饮料(如:蛋糕饼干、坚果炒货、营养饮品等等)",
          value: "3"
        },
        {
          label:
            "个人护理(如:洗发护理、身体护理、口腔护理、卫生护理等等所需用品)",
          value: "4"
        },
        {
          label: "家居清洁(如:纸品湿巾、衣物清洁、家庭清洁、一次性用品等等)",
          value: "5"
        },
        {
          label: "母婴用品(如:奶粉、营养辅食、尿裤湿巾、喂养用品等等)",
          value: "6"
        },
        {
          label: "居家生活(如:五金工具、内衣饰品、宠物园艺)",
          value: "7"
        }
      ],
      checked:[],
      areaList:areaFile,
      city:'',
      area:'110101',
      city:'',
    }
    
  }, 
  methods:{
    //获取选中的01所能供应货源
   checkon(){ 
    //  console.log(this.value)
     let list = this.value.map(item=>this.projectData.filter(pro=>pro.value==item))
     let checked = list.map(item=>item[0].label)
     this.goods = checked.join(";  ")
   },
    showPopup() {
      this.show = true;
    },
    exit(){
      this.show = false;
      this.city = ''
    },
    handleSure(arr){
      this.city = arr[0].name + arr[1].name + arr[2].name
      this.show = false
    },
    async handleSubmit(){
      let data = {
        user_name:this.contacts,
        mobile:this.mobile,
        goods:this.goods,
        brand:this.brand,
        image:this.picList.join(","),
        goods_list:this.fileList.join(','),
        city:this.city,
        address:this.address,
      }
      if( this.contacts && this.mobile && this.selectData && this.brand && this.address && this.desc){
          if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))){ 
              Toast.fail('手机号码有误')
              return false
          } 
          let res = await getJobSuppy(data)
          console.log(res,"res")
          if (res.code == 200) {
              this.$router.push('/subsuccess')
          }else {
              Toast.fail(res.data.msg)
          }
      }else{
         Toast('提交失败,必填项不能为空');
      }
  },
  handleBack(){
    this.$router.push("/homepage")
  },
    



    //上传文件
    afterReadFile (file) {
      this.uploadFile(file.file)
    },
    beforeReadFile (file) {
      const isLt2M = file.size / 1024 / 1024 < 7;
      console.log(file, "file");
      if (!isLt2M) {
        Toast.fail("上传文件大小不能超过 7MB!");
      }
        this.fileData = file
        return true;
    },
    uploadFile (file) {
        // 创建form对象
        let formdata1 = new FormData();
        formdata1.append('goods_list', file);
        let config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        };  
        service1.post('/api/job/upload_goods_image',formdata1,config).then((res)=>{   //这里的url为后端接口
            console.log(res);
            if(res.data.code == 200){
              Toast.fail(res.data.msg)
            }
        }).catch(err => {
            console.log(err)
            Toast.fail('系统异常')
        })
    },


    //上传图片
    afterReadImg (file) {
      this.uploadImg(file.file)
    },
    beforeReadImg (file) {
      const isLt2M = file.size / 1024 / 1024 < 7;
      // console.log(file, "file");
      if (!isLt2M) {
        Toast.fail("上传图片大小不能超过 7MB!");
      }
        this.fileData = file
        return true;
    },
    uploadImg (file) {
        // 创建form对象
        let formdata1 = new FormData();
        formdata1.append('image', file);
        let config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }; 
        service1.post('/api/job/upload_image',formdata1,config).then((res)=>{   //这里的url为后端接口
          console.log(res);
          if(res.data.code == 200){
            Toast.fail(res.data.msg)
          }
        }).catch(err => {
            console.log(err)
            Toast.fail('系统异常')
        })
    },


  }
}
</script>
<style>
.box-mtForm{
  font-size: 14px;
}
.box-mtForm .mint-cell {
     background: #F8F8F8 !important;
     height: 42px !important;
     border-radius:3px !important;
}
.box-mtForm .mint-field-core{
  background: #F8F8F8 !important;
}
.mint-cell-wrapper{
  background-image:none !important
}
.checklist .mint-checkbox-core{
  border-radius: 0%;
  width: 14px;
  height: 14px;
  color:rgba(51,51,51,1);
  line-height:21px;
}
.mint-checklist-label{display: flex;}
.checklist .mint-checkbox-label{
   color:rgba(51,51,51,1);
  line-height:21px;
  display: inline-block;
  /* width: 319px; */
  font-size: 14px;
}
.iptaddress{
  height: 49px;
  padding: 0 10px;
  background: #f8f8f8;
  line-height: 49px;
  font-size: 16px;
}
.mt-address .mint-cell{
   background: #F8F8F8 !important;
     height: 42px !important;
     border-radius:3px !important;
}
.mt-address  .mint-field-core{
  background: #F8F8F8 !important;
}
.textarea{margin-bottom: 48px;padding-bottom: 48px;}
.textarea .mint-cell-wrapper{padding: 0;}
.textarea  .mint-field-core{
  background:rgba(248,248,248,1)!important;
  height: 163px!important;
}
.two-textarea{margin: 0;padding: 0;}
</style>
<style lang="scss" scoped>

.content{
  margin-top:49px;
  padding: 18px;
  .content-top{
    h3 {
          margin:0;
          padding-bottom: 19px;
          font-size: 18px;
          line-height: 1;
          font-weight: bold;
        }
    .red {
      height:119px;
      font-size:14px;
      color:rgba(255,0,0,1);
      line-height:21px;
      margin: 0;
    }

  }  .label{
      font-size: 14px;
      height: 20px;
      color: rgba(16, 16, 16, 1);
    }
.checkdata{
  color: rgba(57,164,219,1);
}

  .column,.goods,.pic,.bill,.partticulars,.else{
    .select {
      display: flex;
      width: 293px;
      margin: 20px 0;
      font-size: 14px;
      color: rgba(16, 16, 16, 1);
      .select-header {
        margin-right: 17px;
        font-size:14px;
        color:rgba(0,0,0,1);
        line-height:17px;
      }
      .select-one{display: inline-block;}
      .select-two {
        margin: 0 9px;
        color: #fa0000;
        vertical-align: middle;
        width: 8px;
        height: 20px;
      }
      .select-three {
        width: 35px;
        height: 20px;
      }
    }
    
  }



  .pic-sub,.bill-sub{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 177px;
    line-height: 20px;
    border-radius: 5px;
    background-color: rgba(248, 248, 248, 1);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0);
    color: rgba(16, 16, 16, 1);
    h4{
      height: 20px;
      font-size: 14px;
      font-weight: normal;
      margin: 0 12px;
    }
    p{
      height: 14px;
      font-size: 14px;
    }
    .pic-btn{
      height:15px;
      font-size:14px;
      text-decoration:underline;
      color:rgba(57,164,219,1);
      line-height:17px;
      text-align: center;
      margin: 0;
    }
    .bill-btn{
      height:15px;
      font-size:14px;
      font-weight:300;
      text-decoration:underline;
      color:rgba(57,164,219,1);
      line-height:17px;
    }
    .bill-desc{
      height:15px;
      font-size:14px;
      color:rgba(51,51,51,1);
      line-height:17px;
      margin-left: 5px;
    }
  }



    .bottom{
        position: fixed;
        bottom: 0;left: 0;
        width: 100%;
        height: 54px;
        line-height: 54px;
        background-color: rgba(0, 0, 0, 1);
        color: rgba(248, 248, 248, 1);
        font-size: 14px;
        text-align: center;
        font-family: Arial;
        border: 1px solid rgba(255, 255, 255, 0);
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
                width:68px;
                height: 14px;
                color: rgba(16, 16, 16, 1);
                font-size: 12px;
                text-align: center;
                font-family: SourceHanSansSC-bold;
            }
            div{
                margin: 15px 0 0 47px;
                width: 118px;
                height: 37px;
                color: rgba(16, 16, 16, 1);
                font-size: 12px;
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