<template>
<!-- 新闻资讯页 -->
  <div class="information">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="container">
        <div v-if='noData' class="nodata">
            暂无数据
        </div>
        <template v-else>
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <ul class="detail">
                  <van-cell class="newslist" v-for="item in list" :key="item" :to="{name:'news',params:{id:item.id} }" >
                      <template>
                          <li>
                              <img :src="item.image" alt="">
                                <h3 class="news-title">{{item.title}}</h3>
                                <p>{{item.content}}</p>
                          </li>
                      </template>
                  </van-cell>
              </ul>
            </van-list>
        </template>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from 'vue';
import { PullRefresh,List,Toast,Cell } from 'vant';
import service1 from '@/utils/http';
import {getSystemNewList} from '@/axios/api'

Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Toast);
Vue.use(Cell);
export default {
  data() {
    return {
      list: [],
      noData: false, // 如果没有数据，显示暂无数据
      loading: false,// 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
      count: 0,
      isLoading: false, // 下拉的加载图案
    }
  },
  mounted(){
      this.onLoad()
      this.getnewslist()
  },
  methods: {
    async getnewslist(){
        let res = await getSystemNewList(this.count)
        // console.log(res)
        if(res.code == 200){
            this.loading = false;
            this.list = this.list.concat(res.data.data)
            this.count++
            if(this.list.length == 0 && this.count == 1){//如果没有数据，显示暂无数据
                console.log('暂无数据')
                this.noData = true
            }
            if(res.data.data.length == 0){// 如果加载完毕，显示没有更多了
                this.finished = true;
            }
        }
    },
    //列表加载
    onLoad () {
      this.getnewslist()
      this.loading = true
    },
    async onRefresh() {
      // 重新初始化这些属性
        this.isLoading = false
        this.myList = []
        this.page = 1
        this.loading = false
        this.finished = false
        this.noData = false
        // 请求信息
        this.onLoad()
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.information{
    margin-top: 50px;
    .nodata{
        width: 100%;
        height: 300px;
        text-align: center;font-size: 30px;
        line-height: 300px;
    }    
}

</style>

