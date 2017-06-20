import BaseApiService, { instanceFactory } from './BaseApiService'
/**
 * 认证相关的服务
 *
 * @export
 * @class AuthService
 * @extends {BaseApiService}
 */
export class AuthService extends BaseApiService {

  MODULE = 'wyapi';
  API_VERSION = 'v1';

  getUser = ({ id }) => {
    // return this.fetch('getUserInfo', {})
    let data = {
      userId: id,
      avatar: 'http://n1image.hjfile.cn/shetuan/2017-05-31-1496235650-401-4869.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/format/jpg',
      name: '张小明' + id,
      sex: '女',
      age: 9,
      class: '小班',
      school: '康桥幼儿园',
      parentName: '张大明',
      tel: '13712321122',
      emergencyContact: '李晓红',
      emergencyContactTel: '13712321122'
    }
    return new Promise((resolve)=>{
      setTimeout(()=>resolve({ data }), 1000)
    })
  }
}

export default new AuthService()
