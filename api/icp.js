import request from '@/utils/request'
//案例
export function projectFindAll(data) {
    return request({
      url: '/icp/project/findAll',
      method: 'get',
      data: data
    });

}
export function projectFindById(data) {
    return request({
      url: '/icp/project/findById/' + data.id +'/'+ data.name,
      method: 'get',
    });

}