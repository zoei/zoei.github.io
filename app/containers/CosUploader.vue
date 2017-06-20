<style lang="stylus">
  .page-upload
    height 100%
</style>

<template>
  <div class="page-upload">
    <input id="file" type="file" @change="onChange" />
    <div id="container">
      <a id="pickfiles" href="javascript:;" @click="selectFiles">[Select files]</a>
      <a id="uploadfiles" href="javascript:;" @click="uploadFiles">[Upload files]</a>
    </div>
    <div v-for="file in files">
      {{file.name + ' ' + file.size}}
    </div>
    <div>{{progress}}</div>
    <a :href="publickLink" target="_blank">{{publickLink}}</a>
  </div>
</template>

<script>
  // import jsSHA from 'cos-js-sdk-v4/src/jssha'
  // import CosCloud from 'cos-js-sdk-v4'
  import CosCloud from '../core/utils/cos-js-sdk-v4'
  // import CryptoJS from 'crypto-js'
  import config from '../config'
  // window.jsSHA = jsSHA
  export default {
    name: 'home',
    metaInfo: {
      title: '上传'
    },
    data () {
      return {
        lastTaskId: 0,
        progress: 0,
        files: [],
        error: {},
        publickLink: ''
      }
    }, 
    components: {
    },
    mounted() {
      this.initUploader()
    },
    methods: {
      initUploader() {
        var cos = this.cos = new CosCloud({
          appid: config.cos.appid,// APPID 必填参数
          bucket: config.cos.bucket,//bucketName 必填参数
          region: config.cos.region,//地域信息 必填参数 华南地区填gz 华东填sh 华北填tj
          getAppSign: function (callback) {//获取签名 必填参数
            fetch('http://z.cc/costoken').then(res=>res.json()).then((payload)=>{
              console.log('getAppSign', payload.data)
              callback(payload.data)
            })
          },
          getAppSignOnce: function (callback) {//获取签名 必填参数
            fetch('http://z.cc/costoken').then(res=>res.json()).then((payload)=>{
              console.log('getAppSignOnce', payload.data)
              callback(payload.data)
            })
          }
        })
      },
      upload(file) {
        this.cos.uploadFile(
          this.onSucess,
          this.onError,
          this.onProgress,
          config.cos.bucket,
          config.cos.baseFolder + file.name,
          file,
          0,
          this.taskReady
        ); //insertOnly==0 表示允许覆盖文件 1表示不允许
      },
      taskReady(taskId) {
        this.lastTaskId = taskId
      },
      onProgress(data) {
        console.log('onProgress', data)
      },
      onSucess(res) {
        console.log('onSucess', res)
        let { access_url, source_url, url } = res.data
        this.publickLink = source_url.replace('zoeicc-1251698524.cossh.myqcloud.com', 'cos.zoei.cc')
      },
      onError(e) {
        console.log('onError', e)
      },
      selectFiles() {

      },
      uploadFiles() {
        this.upload(this.files[0])
      },
      onChange(e) {
        this.files = e.target.files
      }
    }
  }
</script>
