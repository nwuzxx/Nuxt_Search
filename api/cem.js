import request from '@/utils/request'

//====================================藏品风险评估===================
//查询省的操作
export default  {
  searchProvince(){
    return request({
      url: `/cem/district/province`,
      method: 'get',
    })
  },
  //根据id查询相应的市县
  searchCity(provinceid){
    return request({
      url: `/cem/district/getcity/${provinceid}`,
      method: 'get',
    })
  },
  //区
  searchArea(cityId){
    return request({
      url: `/cem/district/getarea/${cityId}`,
      method: 'get',
    })
  },
  //查询所有的残缺程度
  findAllFults(){
    return request({
      url: `/cem/faults/getallfaults`,
      method: 'get',
    })
  },

  //查询所有的藏品类别
  findAllClass(){
    return request({
      url: `/cem/class/findAll`,
      method: 'get',
    })
  },

  //藏品风险评估添加
  addBaseInfo(BaseInfo){
    return request({
      url: `/cem/basic/addBaseInfo`,
      method: 'post',
      data: BaseInfo
    })
  },

  //添加库房信息
  addWarehouseInfo(warehouseinfo){
    return request({
      url: `/cem/warehouse/addWarehouseinfo`,
      method: 'post',
      data: warehouseinfo
    })
  },
  //添加藏品出入库状态表
  addRiskAuditInfo(riskauditinfo){
    return request({
      url: `/cem/inout/addRiskInOutInfo`,
      method: 'post',
      data: riskauditinfo
    })
  },

  //===============================入库申请=========================

  

  //查询藏品风险评估通过的所有藏品id
  getriskpassAllCollectionId(statusid){
    return request({
      url: `/cem/inout/getInoutStatusById/${statusid}`,
      method: 'get',
    })
  },

  //根据id获取藏品风险评估通过的藏品基本信息1
  getBasicInfoBypassIds(arr,current,limit){
    return request({
      url:`/cem/basic/getriskpasslist/${current}/${limit}`,
      method:'post',
      data: arr,
    })
  },

  // 联合查询  获取所有基本信息2

  getUnionInfoByStatusId(objectid){
    return request({
      url:`/cem/union/getunionInfoById/${objectid}`,
      method:'get',
    })
  },
  // 查询所有通过申请的
  getRiskpassfindallById(statusid,current,limit)
  {
    return request({
      url: `/cem/inout/getInoutStatusById/${statusid}/${current}/${limit}`,
      method: 'get',
    })
  },
//=======================================藏品文化价值信息====================================
 addColCultureInfo(data){
   return request({
     url:'/cem/culture/addCultureInfo',
     method:'post',
     data: data
   })
 },
 //更新藏品的出入库状态变为 3风险评估通过且申请
 updateInOutStatusInfo(data){
  return request({
    url:'/cem/inout/updateInoutapply',
    method:'post',
    data: data
  })
 },
 //========================藏品查询=========================
 //条件分页查询
 QueryColInfoByIf(current,limit,data){
   return request({
     url:`/cem/basic/queryColByIf/${current}/${limit}`,
     method: 'post',
     data: data
   })
 },
 //根据id导出pdf
 getPdf(objectId){
  return request({
    url:`/cb/pdf/getPdf/${objectId}`,
    method: 'get',
    responseType: 'blob'
  })
 }
}