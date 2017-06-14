<style lang="stylus">
  .page-usercenter
    .header
      position relative
      height:200px;
      padding-bottom 11px
      background-color:#7ed321;
      background-size 100% auto
      background-position center bottom
      background-repeat no-repeat
      background-image: url(../images/user-header-bg.png)
    .back
      position absolute
      top 24px
      left 10px
      font-size 14px
      color #fff
      span
        display inline-block
        width: 9px;
        height: 9px;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
        background-image url(../images/arrow-left-white.png)
    .header-content
      display flex
      justify-content: space-between;
      align-items: flex-end;
      position: absolute;
      height: 87px;
      bottom: 11px;
      width 100%
      box-sizing border-box
      padding 0 17px

      .avatar
        display inline-block
        vertical-align: bottom;
        width 87px
        height 87px
        border-radius 44px
        background-size cover
        background-position center
        background-repeat no-repeat
      .name
        color #fff
        font-family:PingFangSC-Medium;
        font-size:16px;
    .btns
      display: flex;
      flex-direction: column;
      .btn
        border-radius:100px;
        width:82px;
        height:26px;
        font-family:PingFangSC-Medium;
        font-size:12px;
        box-shadow none
      .btn-change-pwd
        background:#ffffff;
        color:#7ed321;
      .btn-logout
        margin-top 5px
        border:1px solid #ffffff;
        background none
        color #fff
    .mint-navbar
      background: #f9f9f9;
      .mint-tab-item
        padding 12px 0
        color #9b9b9b
        border-bottom: 2px solid #f9f9f9;
        &.is-selected
          font-family:PingFangSC-Medium;
          font-size:14px;
          color:#7ed321;
          border-bottom: 2px solid #7ed321;
          margin-bottom 0
    .content-user
      padding 20px 38px 50px
      box-sizing border-box
      .info-item
        background:#f9f9f9;
        border-radius:5px;
        height:32px;
        line-height 32px
        margin-top 17px
        font-family:PingFangSC-Light;
        font-size:16px;
        color:#4a4a4a;
        padding-right 14px
        &:nth-child(1)
          margin-top 0
        label:before
          content " "
          display: inline-block;
          background: #81d52c;
          width: 3px;
          height: 19px;
          vertical-align: -3px;
          margin-right 7px
        span
          float right
    .content-video
      padding 10px 10px 0px
      box-sizing border-box
      .user-video
        margin-top 20px
    .footer-container
      height 50px
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .nomore
        font-family:PingFangSC-Light;
        font-size:14px;
        color:#4a4a4a;
</style>

<template>
  <div
    class="page-usercenter"
    v-infinite-scroll="loadMoreVideos"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <div class="header">
      <router-link class="back" to="/"><span></span>回首页</router-link>
      <div class="header-content">
        <div>
          <span class="avatar" :style="{'background-image': `url(${userInfo.avatar})` }"/>
          <span class="name">小明爸爸</span>
        </div>
        <div class="btns">
          <mt-button class="btn btn-change-pwd" @click="$router.push('/changepassword')">修改密码</mt-button>
          <mt-button class="btn btn-logout" @click="logout">退出登录</mt-button>
        </div>
      </div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">个人信息</mt-tab-item>
      <mt-tab-item id="2">我的视频</mt-tab-item>
    </mt-navbar>
    <mt-tab-container class="tab-container" v-model="selected">
      <mt-tab-container-item id="1" class="content-user">
        <div class="info-item"><label>学生姓名</label><span>{{userInfo.name}}</span></div>
        <div class="info-item"><label>学生性别</label><span>{{userInfo.sex}}</span></div>
        <div class="info-item"><label>年龄</label><span>{{userInfo.name}}</span></div>
        <div class="info-item"><label>班级</label><span>{{userInfo.class}}</span></div>
        <div class="info-item"><label>学校</label><span>{{userInfo.school}}</span></div>
        <div class="info-item"><label>家长姓名</label><span>{{userInfo.school}}</span></div>
        <div class="info-item"><label>联系电话</label><span>{{userInfo.parentName}}</span></div>
        <div class="info-item"><label>紧急联系人</label><span>{{userInfo.emergencyContact}}</span></div>
        <div class="info-item"><label>紧急联系人电话</label><span>{{userInfo.emergencyContactTel}}</span></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="content-video">
        <div v-for="video in videoList" >
          <video-player class="user-video" :source="video.videoUrl" :poster="video.coverUrl" />
        </div>
        <div class="footer-container">
          <mt-spinner v-if="loading" type="fading-circle" :size="24"></mt-spinner>
          <span v-if="ending" class="nomore">没有更多了</span>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  import VideoPlayer from '../components/VideoPlayer.vue'

  export default {
    name: 'app',
    metaInfo: {
      title: '用户中心'
    },
    data () {
      return {
        start: 0,
        limit: 10,
        loading: false,
        ending: false,
        selected: "1",
        userInfo: {},
        videoList: []
      }
    },
    components: {
      VideoPlayer
    },
    created() {
      this.getUserInfo()
    },
    watch: {
      selected(v) {
        if (v == 2 && !this.videoList.length) this.loadMoreVideos()
      }
    },
    methods: {
      getUserInfo() {
        this.$store.dispatch('getUserInfo')
        .then(payload=>{
          console.log('payload', payload)
          this.userInfo = payload.data
        }).catch(({ message, validations })=>{
          console.log({ message, validations })
          MessageBox.alert(message, '提示')
        })
      },
      loadMoreVideos() {
        if (this.selected != '2' || this.loading || this.ending) return
        this.loading = true
        this.$store.dispatch('getUserVideos', { start: this.start , limit: this.limit }).then(payload=>{
          const { data, hasMore } = payload
          this.loading = false
          this.ending = !hasMore
          this.videoList = this.videoList.concat(data)
          this.start = this.start + this.limit
        }).catch(({ message, validations })=>{
          this.loading = false
          MessageBox.alert(message, '提示')
        })
      },
      logout() {
        document.cookie = ''
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    }
  }
</script>
