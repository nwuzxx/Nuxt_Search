import request from '@/utils/request'

// 查询所有个人项目
export function projectFindAll(data) {
    return request({
      url: '/fms/project/findAll/'+data.pageNum + '/' + data.pageSize,
      method: 'get',
    });
}
//模糊查询个人项目
export function projectFindById(data) {
    return request({
      url: '/fms/project/findById/',
      method: 'post',
      data: data
    });
}

//添加个人项目
export function addOneProject(data) {
  return request({
    url: '/fms/project/addOneProject/',
    method: 'post',
    data: data
  });
}

//查询个人的所有收入
export function salaryFindAll(data){
  return request({
    url: '/fms/salaryinfo/findAll/'+data.pageNum + '/' + data.pageSize,
    method: 'get',
  });
}

//按照时间段筛选个人收入
export function checkSalaryList(data){
  return request({
    url: '/fms/salaryinfo/findByDate/',
    method: 'post',
    data: data
  });
}

//添加个人收入
export function addOneSalary(data) {
  return request({
    url: '/fms/salaryinfo/addSalaryInfo/',
    method: 'post',
    data: data
  });
}

//查询个人的所有来款信息
export function getrecordAllList(data){
  return request({
    url: '/fms/recordContribution/findAll/'+data.pageNum + '/' + data.pageSize,
    method: 'get',
  });
}

//按照流水号查询来款信息
export function recordFindByNumber(data){
  return request({
    url: '/fms/recordContribution/findByNumber/'+data.serialNumber,
    method: 'get',
  });
}

//添加个人来款信息
export function addOneRecord(data) {
  return request({
    url: '/fms/recordContribution/addOneRecord/',
    method: 'post',
    data: data
  });
}




