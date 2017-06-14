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

  sendSMSCode = ({ phoneNo }) => {
    return this.fetch('SendSMSCode', {}, { method: 'POST', body: { mobileNo: phoneNo }, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }

  signup = ({ phoneNo, password, code }) => {
    return this.fetch('Signup', {}, { method: 'POST', body: { mobileNo: phoneNo, password, code }, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }

  signin = ({ phoneNo, password }) => {
    return this.fetch('Signin', {}, { method: 'POST', body: { mobileNo: phoneNo, password }, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }

  /**
   * 保存报名信息
   * studentName        学生姓名
   * age                年龄
   * gender             性别, 1=男, 2=女
   * school             学校名称
   * grade              年级：大班, 中班, 小班
   * parentName         家长姓名
   * parentMobileNo     家长联系电话
   * emergencyName      紧急联系人姓名
   * emergencyMobileNo  紧急联系人电话
   * @memberof AuthService
   */
  saveRegisterInfo = ({ studentName, age, gender, school, grade, parentName, parentMobileNo, emergencyName, emergencyMobileNo }) => {
    return this.fetch('SaveRegisterInfo', {}, { method: 'POST', body: { studentName, age, gender, school, grade, parentName, parentMobileNo, emergencyName, emergencyMobileNo }, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }

  changepassword = ({ password, newPassword }) => {
    return this.fetch('ChangePassword', {}, { method: 'POST', body: { password, newPassword }, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  }

  getNews = ({ start, limit }) => {
    // return this.fetch('GetNews', { start, limit })
    const DEFAULT_PIC = 'http://n1image.hjfile.cn/shetuan/2017-05-31-1496235650-401-4869.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/format/jpg'
    let data = []
    for(let i = 0;i < limit;i++) {
      data.push({
        title: '一带一路，峰会展风采',
        detail: `新益求新”――用创意与科技，联结与公益的桥
梁划开快递盒子上的胶带纸，动物涂鸦随之被割动物涂鸦随之被割动物涂鸦随之被割
裂，顺着豁口的方向……`,
        link: '/trainings',
        pic: DEFAULT_PIC,
        watched: 430
      })
    }
    return new Promise((resolve)=>{
      setTimeout(()=>resolve({ data, hasMore: start <= 50 }), 1000)
    })
  }

  getBanner = ({}) => {
    // return this.fetch('getBanner', {})
    const DEFAULT_PIC = 'http://n1image.hjfile.cn/shetuan/2017-05-31-1496235650-401-4869.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/format/jpg'
    let data = [
      {
        title: '【成长关注】足球，可以带给孩子什么',
        url: DEFAULT_PIC,
        link: '/#1'
      },
      {
        title: '【成长关注】足球，可以带给孩子什么',
        url: DEFAULT_PIC,
        link: '/#2'
      },
      {
        title: '【成长关注】足球，可以带给孩子什么',
        url: DEFAULT_PIC,
        link: '/#3'
      },
      {
        title: '【成长关注】足球，可以带给孩子什么',
        url: DEFAULT_PIC,
        link: '/#4'
      }
    ]
    return new Promise((resolve)=>{
      setTimeout(()=>resolve({ data }), 100)
    })
  }

  getUserInfo = () => {
    // return this.fetch('getUserInfo', {})
    let data = {
      avatar: 'http://n1image.hjfile.cn/shetuan/2017-05-31-1496235650-401-4869.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/format/jpg',
      name: '张小明',
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

  getUserVideos = ({ start, limit }) => {
    // return this.fetch('getUserVideos', { start, limit })
    
    let data = []
    for(let i = 0;i < limit;i++) {
      data.push({
        videoName: '美国CES展&硅谷考察分享',
        coverUrl: 'http://n1image.hjfile.cn/shetuan/9fb25f05-276c-40f8-91c4-01c68119a9ed.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/format/jpg',
        videoUrl: 'https://record-manual.cctalk.com/1008780.mp4?sign=78dd178cb9228f50f1c000c2059f7cce&t=5932dbd7'
      })
    }
    return new Promise((resolve)=>{
      setTimeout(()=>resolve({ data, hasMore: start <= 50 }), 1000)
    })
  }

  getVideos = ({ start, limit }) => {
    // return this.fetch('getVideos', { start, limit })
    
    let data = []
    for(let i = 0;i < limit;i++) {
      data.push({
        videoName: '美国CES展&硅谷考察分享',
        coverUrl: 'http://n1image.hjfile.cn/shetuan/9fb25f05-276c-40f8-91c4-01c68119a9ed.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/format/jpg',
        videoUrl: 'https://record-manual.cctalk.com/1008780.mp4?sign=78dd178cb9228f50f1c000c2059f7cce&t=5932dbd7',
        tags: ['康桥幼儿园', '小明爸爸']
      })
    }
    return new Promise((resolve)=>{
      setTimeout(()=>resolve({ data, hasMore: start <= 50 }), 1000)
    })
  }

  getMovies = ({ start, limit }) => {
    // return this.fetch('getMovies', { start, limit })
    const DEFAULT_PIC = 'http://n1image.hjfile.cn/shetuan/2017-05-31-1496235650-401-4869.jpg?imageMogr2/auto-orient/thumbnail/!640x360r/gravity/Center/crop/640x360/format/jpg'
    let data = []
    for(let i = 0;i < limit;i++) {
      data.push({
        name: '小小电影人',
        cover: DEFAULT_PIC,
        director: '小明爸爸',
        actors: ['胡歌', '胡二哥', '胡三个'],
        desc: `“新益求新”――用创意与科技“新益求新”――用创意与科技，联结与公益的桥梁划开快递盒子上的胶带纸，动物涂鸦随之被割裂，动物涂鸦随之被割裂，动物涂鸦随之被割裂，顺着豁口的方向……`
      })
    }
    return new Promise((resolve)=>{
      setTimeout(()=>resolve({ data, hasMore: start <= 50 }), 1000)
    })
  }
}

export default new AuthService()
