import request from '@/utils/request'

export default {
    //分页查询文物信息
    getImageList(current, limit, searchObj){
        return request({
            url: '/CollectionInformationManagement/getCollectionInfo/pageConditionFind/' + current + '/' + limit,
            method: 'post',
            data: searchObj
        })
    },

    //查询所有文物信息
    getImageAll(){
        return request({
            url: '/CollectionInformationManagement/getCollectionInfo/findAll',
            method: 'get',
            data: items
        })

     
    },

    getImgId(img_id){
        return request({
            url:'/CollectionInformationManagement/getCollectionInfo/GetCollection/'+ img_id,
            method:'get',
        })
    },
}