<style lang="stylus">
</style>

<template>
  <div class="">
    <div>{{user.userId}}</div>
    <div id="container">
      <a id="pickfiles" href="javascript:;">选择文件</a>
      <a id="uploadfiles" href="javascript:;">上传文件</a>
    </div>
    <div v-for="file in files">
      {{file.name + ' ' + file.size}}
    </div>
    <div>{{progress}}</div>
    <a :href="publickLink">{{publickLink}}</a>
  </div>
</template>

<script>
  import config from '../config'
  import types from '../store/mutation-types'

  export default {
    name: 'home',
    metaInfo: {
      title: '上传'
    },
    data () {
      return {
        progress: 0,
        files: [],
        error: {},
        publickLink: ''
      }
    }, 
    components: {
    },
    mounted() {
      // this.initUploader()
    },
    asyncData ({ store, route: { params: { id }}}) {
      return store.dispatch(types.GET_USER, { id })
    },
    computed: {
      user () {
        return this.$store.state.wanyuan.users[this.$route.params.id] || {}
      }
    },
    methods: {
      async getCosUrl(destPath) {
        let res = await fetch('http://zoei.cc/costoken')
        let payload = await res.json()
        let sign = payload.data
        let region = config.cos.region
        let bucket = config.cos.bucket
        let url = config.cos.cos_url
        url = url.replace('REGION', config.cos.region)
        return Promise.resolve(url + config.cos.appid + '/' + bucket + destPath + '?sign=' + sign)
      },
      async initUploader(url) {
        let me = this
        var uploader = this.uploader = new plupload.Uploader({
          runtimes : 'html5,html4',
          browse_button : 'pickfiles', // you can pass an id...
          container: document.getElementById('container'), // ... or DOM Element itself
          url : url || 'http://dev.zoei.cc/upload/image',
          file_data_name: 'fileContent',
          send_file_name: true,
          multipart_params: {
            op: 'upload',
            insertOnly: 0
          },
          filters : {
            max_file_size : '100mb',
            mime_types: [
              { title : "Image files", extensions : "jpg,gif,png" },
              { title : "Video files", extensions : "mp4,mpeg,mov" },
              { title : "Zip files", extensions : "zip" }
            ]
          },

          init: {
            PostInit: function() {
              document.getElementById('uploadfiles').onclick = async () => {
                let url = await me.getCosUrl(config.cos.baseFolder + this.files[0].name)
                console.log(url, me.files)
                uploader.settings.url = url
                uploader.start()
                return false;
              }
            },
            FilesAdded: function(up, files) {
              me.files = files
              console.log('FilesAdded', files)
            },
            UploadProgress: function(up, file) {
              me.progress = file.percent
              console.log('UploadProgress', file.percent)
            },
            FileUploaded: function(up, file, info) {
              let res = JSON.parse(info.response)
              let { access_url, source_url, url } = res.data
              me.publickLink = source_url.replace('zoeicc-1251698524.cossh.myqcloud.com', 'cos.zoei.cc')
              console.debug('FileUploaded', res)
            },
            Error: function(up, err) {
              me.error = err
              console.log('Error', err)
            }
          }
        })
        uploader.init()
      },
      uploadFiles() {
        this.uploader && this.uploader.start()
      }
    }
  }
</script>
