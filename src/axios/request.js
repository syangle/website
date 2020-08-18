import qs from "qs";
import axios from "axios";

const service = axios.create({
  // baseURL: "http://192.168.0.107", // 后台本地地址
  baseURL: "https://admin.abram.xin", // 正式开发地址
  // baseURL: "https://tibossvis.dgg.net", // 测试地址
  timeout: 5000 // 请求超时时间

});
// request拦截器==>对请求参数做处理
service.interceptors.request.use(config => {
  // startLoading();
  // 设置自定义tocken 
  // app.$vux.loading.show({
  //     text: '数据加载中...'
  // });
  // let token = window.localStorage.getItem('token')
  // if (token) {
  //     token = token.replace(/'|"/g, '') // 把token加入到默认请求参数中
  //     config.headers['token'] = token
  //     console.log(token, "token")
  // }
  config.method === 'post' ?
    config.data = qs.stringify({
      ...config.data
    }):
    config.params = {
      ...config.params
    };
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  return config;
}, error => {
  // 请求错误处理
  // Message.error(error);
  Promise.reject(error)

});
// respone拦截器==>对响应做处理
service.interceptors.response.use(
  response => { //成功请求到数据
    // endLoading(); //请求时的加载动画
    // app.$vux.loading.hide();
    // //这里根据后端提供的数据进行对应的处理
    // if (response.data.result === 'TRUE') {
    //     return response.data;
    // } else {
    //     app.$vux.toast.show({ //常规错误处理
    //         type: 'warn',
    //         text: response.data.data.msg
    //     });
    // }
    return response.data;
  },
  error => { //响应错误处理
    // console.log('error');
    console.log(JSON.stringify(error), "ceshi");

    let text = JSON.parse(JSON.stringify(error)).response.status === 404 ?
      '404' :
      '网络异常，请重试';

    return Promise.reject(error)


  }
);

export default service;
