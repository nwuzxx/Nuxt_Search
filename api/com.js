import request from '@/utils/request'

//获取藏品基本信息
export function getCollectionById(id) {
    return request({
        url: '/com/basic/getCollection/' + id,
        method: 'get',
    })
}
//获取在库藏品
export function getAllCollection() {
    return request({
        url: '/com/basic/findAllCollection',
        method: 'get'
    })
}
//修改藏品状态码 提交出库申请
export function updateCollectionStatus(collectionInoutStatus) {
    return request({
        url: '/com/inout/updateCollectionStatus/',
        method: 'post',
        data: collectionInoutStatus
    })
}

//获取藏品状态
export function getCollectionStatusById(id) {
    return request({
        url: '/com/inout/getCollectionStatusInfo/' + id,
        method: 'get'
    });
}

//获取所有在库藏品idlist 在状态表中查询
export function getInnerCollectionIdList() {
    return request({
        url: '/com/inout/getInoutStatusById/' + 4,
        method: 'get'
    })
}

//通过idList来获取基础信息 在基本表中查询
export function getAllInnerCollection(arr, current, limit) {
    return request({
        url: `/com/basic/pageAllCollection/${current}/${limit}`,
        method: 'post',
        data: arr
    })
}

//获取联合信息表
export function getUnionCollectionById(id) {
    console.log("getUnionCollectionById", id);
    return request({
        url: `/com/union/getUnionCollectionInfo/${id}`,
        method: 'get'
    })
}

//获取出库藏品的idList数组 在状态表中查询
export function getOutCollectionIdList() {
    return request({
        url: '/com/inout/getInoutStatusById/' + 8,
        method: 'get'
    })
}

//根据已出库list数组分页获取藏品基本信息 在基本表中查询
export function getAllOutCollection(arr, current, limit) {
    return request({
        url: `/com/basic/pageAllOutCollection/${current}/${limit}`,
        method: 'post',
        data: arr
    })
}

//获取藏品所有类信息
export function getCollectionClass() {
    return request({
        url: '/com/class/getAllClass',
        method: 'get'
    })
}

//获取藏品残缺
export function getCollectionFaults() {
    return request({
        url: '/com/faults/getAllFaults',
        method: 'get'
    })
}

//条件分页查询
export function pageQueryCollection(current, limit, data) {
    return request({
        url: `/com/basic/QueryCollection/${current}/${limit}`,
        method: 'post',
        data: data
    })
}