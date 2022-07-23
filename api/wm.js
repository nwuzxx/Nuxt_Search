import request from '@/utils/request'
//==================仓单管理微服务====================
export default  {

    //根据藏品出入库状态id获取藏品不同状态
    getInOutStatusByIds(statusId){
      return request({
        url: `/wm/inout/getInoutStatusById/${statusId}`,
        method: 'get',
      })
    },

    //根据藏品id更改出入库状态表中的通过时间和风险评估通过管理员和藏品状态
    updateInOutInfo(data){
        return request({
            url:`/wm/inout/updateInOutInfo`,
            method:'post',
            data: data
        })
    },

    //根据idlist中的藏品id获取到藏品风险提交过的信息记录
    getBasicInfoByIds(array,current,limit){
        return request({
            url:`/wm/basic/queryBasicInfoByIds/${current}/${limit}`,
            method: 'post',
            data:array
        })
    },
    //====================入库审核=========================
    //更新出入库状态表 根据藏品id更改入库审核状态为入库/驳回
    updateEnterAuditStatus(data){
        return request({
            url:`/wm/inout/updateInAuditStatus`,
            method: 'post',
            data: data
        })
    },
    //====================出库审核=========================
    updateOutAuditStatus(data){
        return request({
            url:`/wm/inout/updateOutAuditStatus`,
            method: 'post',
            data: data,
        })
    },
    //======================联合查询==========================
    //根据藏品id获取到藏品的基本信息记录（已提交风险评估的基本信息）
    getRiskApplyInfoById(objectid){
        return request({
            url:`/wm/union/GetRiskApplyInfo/${objectid}`,
            method:'get'
        })
    },
    queryUnionColInfo(objectid){
        return request({
            url:`/wm/union/queryUnionColInfo/${objectid}`,
            method: 'get',
        })
    },
    //============================藏品查询==========================
    //获取藏品类别信息
    getClassInfo(){
        return request({
            url:`/wm/class/getallclass`,
            method:'get'
        })
    },
    //获取藏品残缺程度信息
    getFaultsInfo(){
        return request({
            url:`/wm/faults/getallfaults`,
            method:'get'
        })
    },
    //根据条件进行查询 objectQuery：编号，名称，类别，残缺程度，藏品id集合
    queryObjectByCondition(current,limit,objectQuery){
        return request({
            url:`/wm/basic/queryCollectionByIf/${current}/${limit}`,
            method:'post',
            data:objectQuery
        })
    }
}