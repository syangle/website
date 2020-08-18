import axios from "axios"
const service1 = axios.create({
    baseURL: "https://admin.abram.xin", // 正式开发地址
    timeout: 3000,  //延时默认3秒
});


// service.interceptors.request.use(config => {
//     config.method === 'post' ?
//       config.data = qs.stringify({
//         ...config.data
//       }):
//       config.params = {
//         ...config.params
//       };
//     config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//     return config;
//   }, error => {
//     // 请求错误处理
//     // Message.error(error);
//     Promise.reject(error)
  
//   });


// // respone拦截器==>对响应做处理
// service.interceptors.response.use(
//     response => { //成功请求到数据
//       return response.data;
//     },
//     error => { //响应错误处理
//       // console.log('error');
//       console.log(JSON.stringify(error), "ceshi");
  
//       let text = JSON.parse(JSON.stringify(error)).response.status === 404 ?
//         '404' :
//         '网络异常，请重试';
  
//       return Promise.reject(error)
  
  
//     }
//   );

export default service1