<template>
  <div class="header" v-if="this.$route.meta.index  !='1'">
    <div class="box">
        <div class="nav">
            <div class="logo"><img src="@/assets/亚伯兰.png" alt=""></div>
            <div class="menu" @click="handMenu"><img src="@/assets/menu.png" alt=""></div>
        </div>
       
 
    </div>
    <div class="menulist" v-if="isshow" style="height:1400px;overflow-y:scroll">
        <ul class="navbar" v-if="isshow" style="height:100%;padding-bottom:200px;overflow-y:auto">
          <li class="nav-item"></li>
          <li class="nav-item">
            <div class="thick">
              <div class="thick_wire"></div>
              <p>首页</p>
            </div>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/" >企业文化</router-link>
            <!-- <p @click="returnTop('#componeny')">企业文化</p> -->
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/">时间线</router-link>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/productlist"> 我们的产品</router-link>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/">联系我们</router-link>
          </li>
          <li class="nav-item">
            <div class="thick">
              <div class="thick_wire"></div>
              <p>新闻资讯</p>
            </div>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/information">新闻动态</router-link>
          </li>
          <li class="nav-item">
            <div class="thick">
              <div class="thick_wire"></div>
              <p>企业文化</p>
            </div>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/culture">我们的观点</router-link>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/culture">企业社会责任</router-link>
          </li>
          <li class="nav-item">
            <div class="thick">
              <div class="thick_wire"></div>
              <p>加入我们</p>
            </div>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="joinus">人才招募</router-link>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/partnership">加入领居</router-link>
          </li>
          <li class="nav-item" @click="handMenu">
            <router-link class="nav-link" to="/partnership">品牌入驻</router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      isshow:false
    }
  },
  methods:{
    handMenu(){
      this.isshow = !this.isshow
    },
    // returnTop:function(id){//实现定点跳转
    //   document.querySelector(id).scrollIntoView(true);
    // }
  },
   mounted(){
    console.log(this.$route,"this.$route1111")
  }
}
</script>
<style>

</style>
<style lang="scss" scoped>
    .header{
        height: 49px;
        background:#00142d;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 20;
        .nav{
          height: 49px;
          padding: 0 6px;
            display: flex;
            justify-content: space-between;
            color: #fff;
            margin:0 10px;
        }
        .logo{
          width: 60px;
          height: 38px;
          margin: 5px 0;
          img{
             display: block;
            height: auto;
            width: 100%;
          }
        }
        .menu{
          width: 24px;
          height: 20px;
          margin: 14px 0;
          img{
            display: block;
            height: auto;
            width: 100%;
          }
        }
        
        .navbar{
          background: #fff;
          padding-bottom: 20px;
          z-index: 20;
          .nav-item{
            height: 40px;
            line-height: 40px;
            font-size: 25px;
            color: #333333;
            padding: 0 8px;
            text-decoration: none;
            margin-left: 10px;
            p{margin: 0;}
          }
          .nav-link {
            height:40px;
            line-height: 40px;
            margin-left: 18px;
            color: #333333;
            font-size: 17px;
            text-decoration: none;
          }

          #nav-menu:checked ~ .navbar {
            display: block;
            background: #ffffff;
          }

          .nav-head {
            padding-top: 5px;
            background: rgba(0, 20, 45, 1);
            position: fixed;
            width: 100%;
            z-index: 100;
          }

          .thick {
            font-weight: bold;
            color: #333333;
            font-size: 20px;
            display: flex;
            align-items: center;
            .thick_wire {
              height: 24px;
              width: 4px;
              background: #333333;
              margin-right: 14px;
              border-radius: 45px;
            }
          }
        }
    }
</style>