import service from './request'

// 初始化客户评价的数据
export const getPersonInfo = data => {
  return service({
    url: "/api/vis/satisfaction_evaluate/cus_evaluate_data.do",
    method: 'post',
    data
  })

}
// 评价客户
export const getEvaluateInfo = data => {
  return service({
    url: "/api/vis/satisfaction_evaluate/cus_evaluate.do",
    method: 'post',
    data
  })
}
//新闻列表接口
export const getSystemNewList = data => {
  return service({
    url: "/api/system/news_list",
    method: 'post',
    data
  })
}
// 新闻列表详情页
export const getSystemNewDetail = data => {
  return service({
    url: "/api/system/news_detail",
    method: 'post',
    data
  })
}
// 首页轮播图
export const getSystemBanner = data => {
  return service({
    url: "/api/system/banner",
    method: 'post',
    data
  })
}
//首页企业文化
export const getSystemCulture = data => {
  return service({
    url: "/api/system/culture",
    method: 'post',
    data
  })
}
// api/system/event_pic
//大事件图片
export const getSystemEvent = data => {
  return service({
    url: "/api/system/event_pic",
    method: 'post',
    data
  })
}
// 我们的产品
// api/system/product_list
export const getSystemProduct = data => {
  return service({
    url: "/api/system/product_list",
    method: 'post',
    data
  })
}
//system/article
// 社会责任
export const getSystemArtice = data => {
  return service({
    url: "/api/system/article",
    method: 'post',
    data
  })
}
//城市、职位
export const getSystemJob = data => {
  return service({
    url: "/api/job/city",
    method: 'post',
    data
  })
}
//职位城市
export const getSystemJobList = data => {
  return service({
    url: "/api/job/job_list",
    method: 'post',
    data
  })
}
//供货申请

export const getJobSuppy = data => {
  return service({
    url: "/api/job/supply_application",
    method: 'post',
    data
  })
}
//提交
export const getSystemSend = data => {
  return service({
    url: "/api/job/deliver",
    method: 'post',
    data
  })
}
// 职位详情
export const getSystemDetails = data => {
  return service({
    url: "/api/job/job_detail",
    method: 'post',
    data
  })
}
//页脚
export const getSystemconfig = data => {
  return service({
    url: "/api/system/config",
    method: 'post',
    data
  })
}
//上传简历
export const getUploadFile = data => {
  return service({
    url: "/api/job/upload_file",
    method: 'post',
    data
  })
}
//上传货物清单
export const getUploadGoodsFile = data => {
  return service({
    url: "/api/job/upload_goods_image",
    method: 'post',
    data
  })
}
//上传货物图片
export const getUploadGoodsImg = (formdata1,config) => {
  return service({
    url: "/api/job/upload_image",
    method: 'post',
    formdata1,
    config
  })
}

