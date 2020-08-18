import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  import HomePage from "@/views/HomePage"
  import productList from "@/views/productList"
  import Information from "@/views/information"
  import Detail from "@/views/detail"
  import Culture from "@/views/culture"
  import JoinUs from "@/views/joinUs"
  import Supplier from "@/views/supplier"
  import Partnership from "@/views/partnership"
  import Linjuapp from "@/views/linjuApp"
  import News from "@/views/news"
  import SubSuccess from "@/views/subSuccess"
  import Post from "@/views/post"
  import Error from "@/views/Error"

  const routes = [
    {
      path:"/homepage",
      component:HomePage
    },
    {
      path:"/productlist",
      component:productList
    },
    {
      path:"/culture",
      component:Culture
    },
    {
      path:"/information",
      component:Information
    },
    {
      name:'post',
      path:"/post",
      component:Post,
      props:true
    },
    {
      path:"/joinus",
      component:JoinUs,
    },
    {
      name:'joinus',
      path:"/joinus/:id",
      component:Detail,
      props:true
    },
    {
      path:"/supplier",
      component:Supplier
    },
    {
      path:"/subsuccess",
      component:SubSuccess
    },
    {
      path:"/partnership",
      component:Partnership
    },
    {
      name:'linju',
      path:"/linjuapp/:id",
      component:Linjuapp,
      props:true,
      meta:{index:2}
    },
    {
      name:'news',
      path:"/news/:id",
      component:News,
      props:true
    },
    {
      path:"/",
      redirect:"/homepage"
    },
    {
      path:"*",
      component:Error
    }
]

const router = new VueRouter({
  routes
})

export default router
