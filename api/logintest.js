import request from '@/utils/request'

export default{
    //登录的方法
    submitLogin(userInfo){
        return request({
            url: `/nwucenter/member/login`,
            method: 'post',
            data: userInfo
        })
    },
    //根据token值获取用户信息
    getUserLogintoken(){
        return request({
            url: `/nwucenter/member/getMemberInfo`,
            method: 'get'
        })
    }

}