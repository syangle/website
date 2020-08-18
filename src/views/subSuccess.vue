<template>
    <!-- 提交完成 -->
    <div class="subSuccess" >
        <div class="success-desc">
            <p>提交成功</p>
            <div>请耐心等待 保持联系方式畅通 </div>
        </div>
        <button class="success-btn" @click="handleBack">返回首页</button>
    </div>
</template>
<script>
export default {
    methods:{
         handleBack(){
            console.log(this.$router.push("/homepage"))//提交成功返回首页
        },
    }
   
}
</script>
<style lang="scss" scoped>
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