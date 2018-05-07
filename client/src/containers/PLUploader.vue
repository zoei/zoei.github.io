<style lang="stylus">
  .page-upload
    height 100%
</style>

<template>
  <div class="page-upload">
    <div id="filelist">Your browser doesn't have Flash, Silverlight or HTML5 support.</div>
    <br />
    <div id="container">
      <a id="pickfiles" href="javascript:;">[Select files]</a>
      <a id="uploadfiles1" href="javascript:;">[Upload files]</a>
    </div>
    <div v-for="file in files">
      {{file.name + ' ' + file.size}}
    </div>
    <div>{{progress}}</div>
  </div>
</template>

<script>
  import config from '../config'
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
      }
    }, 
    components: {
    },
    mounted() {
      this.initUploader()
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
        return Promise.resolve(url + this.appid + '/' + bucket + '/' + destPath + '?sign=' + sign)
      },
      async initUploader(url) {
        let me = this
        var uploader = this.uploader = new plupload.Uploader({
          runtimes : 'html5,html4',
          browse_button : 'pickfiles', // you can pass an id...
          container: document.getElementById('container'), // ... or DOM Element itself
          url : url || 'http://dev.zoei.cc/upload/image',

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
              document.getElementById('uploadfiles1').onclick = async () => {
                alert(this.files)
                let url = await this.getCosUrl(config.cos.baseFolder + this.files[0].name)
                console.log(uploader, url)
                uploader.settings.url = url
                uploader.start()
                return false;
              }
            },
            FilesAdded: function(up, files) {
              // plupload.each(files, function(file) {
              //   document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
              // });
              me.files = files
              console.log('FilesAdded', files)
            },
            UploadProgress: function(up, file) {
              me.progress = file.percent
              console.log('UploadProgress', file.percent)
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
