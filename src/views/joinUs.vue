<template>
<!-- 职位列表页 -->
    <div class="joinus">
        <van-search class="search" v-model="keyWord" placeholder="搜索职位关键词" input-align="center" @search="getSearch"/>
        <div class="menu">
            <van-dropdown-menu class="dropmenu">
                <van-dropdown-item v-model="value1" :options="option1" :title="cityTitle" @change="getvalue()"/>
                <van-dropdown-item v-model="value2" :options="option2"  :title="typeTile" @change="getvalue()"/>
            </van-dropdown-menu>
        </div>

        <div class="position"
            v-for="item in jobList"
            :key="item.id"
            @click="getPath(item.id)"
        >
            <h3>{{item.job}}</h3>
            <div class="icon">
                <p class="shezhao"><img src="@/assets/社招.png" alt="">{{item.city_name}}</p> 
                <p class="address"><img src="@/assets/城市.png" alt="">{{item.city_name}}</p> 
                <p><img src="@/assets/研发.png" alt="">{{item.type_name}}</p>
            </div>
            <ul class="desc">
                <li v-html="item.job_desc">{{item.job_desc}}</li>
            </ul>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import {getSystemJob,getSystemDetails,getSystemJobList} from '@/axios/api'
import { Search,DropdownMenu, DropdownItem, Toast } from 'vant';
// import service from "@/utils/http"

Vue.use(Search);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
export default {
    data(){
        return {
            keyWord:"", //关键字
            value1:"",
            value2:"",
            cityTitle:'所在城市',
            typeTile:"岗位类别",
            option1: [],
            option2: [],
            jobList:[],
            address:"",
            position:"",
            totalCount: 10,
            currentPage: 1,
            pagesize: 10,
        }
    },
    mounted(){
        this.getCityList()
        this.getList()
    },
   methods:{
        async getCityList() {
           let res = await getSystemJob()
           if (res.data) {
            let result = res.data
            result.city.map((item,index)=>{
                item.text = result.city[index].city_name
                item.value = result.city[index].id
            })
            this.option1 = result.city
            this.option1.unshift({text:'全部',value:""})


            result.type.map((item,index)=>{
                item.text = result.type[index].type_name
                item.value = result.type[index].id
            })
            this.option2 = result.type
            this.option2.unshift({text:'全部',value:""})
           }

       },
        async getList(){
           let datas = {
               city_id:this.value1,
               type_id:this.value2,
               keyword:this.keyWord
           }
           let resData = await getSystemJobList(datas)
           if (resData.data) {
               this.jobList = resData.data.data
           } else {
               this.jobList = []
               console.log(resData.msg)
               Toast.fail(resData.msg)
           }
        // console.log(this.jobList,"this.jobList")
       },
       getvalue(){
           var addressname = this.option1.find((element) => (element.value == this.value1))
           var positionname = this.option2.find((element) => (element.value == this.value2))
        //    console.log(this.value1,"this.value1")
           if (addressname) {
            this.cityTitle =  addressname.city_name
            this.getList()
           }
            if (positionname) {
            this.typeTile = positionname.type_name
            this.getList()
           }
       },
       getSearch(value){
        //    console.log(value)
           this.keyword = value;
           this.getList()
       },
       getPath(id) {
           this.$router.push({
                name:"joinus",
                params:{id:id}
           })
       },




    

   }
}
</script>
<style>
 .menu .van-dropdown-menu__bar{
    box-shadow:none !important;
    height: 39px!important;
}
.menu .van-dropdown-menu{
    height: 39px;
}
    
</style>
<style lang="scss" scoped>
.joinus{
    margin-top:49px;
   
    .position{
        background:#fff;
        border-top: solid 1px #D8D8D8;
        p{
            color: rgba(16, 16, 16, 1);
            font-size: 12px;
        }
        h3{
            margin: 0;
            margin-top: 12px;
            color: rgba(16, 16, 16, 1);
            font-size: 14px;
            display: flex;
            align-items: center;
            height: 30px;
            margin-left: 20px;
            
        }
        .icon{
            display: flex;
            height:25px;
            align-items: center;
            margin-left: 20px;
            width: 80%;
            img{
                width: 13px;
                height: 13px;
                margin-right: 5px;
            }
            .shezhao,.address{
                width: 60px;
            }
        }
  
        .desc{
            color: rgba(16, 16, 16, 1);
            font-size: 14px;
            text-align: left;
            li{
                margin: 0 18px;
            }
            li /deep/ p:last-child{margin: 0;height: 0;}
        }
       margin-bottom: 8px;
    }
}
</style>