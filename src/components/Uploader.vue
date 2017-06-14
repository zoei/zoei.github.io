<style lang="stylus">
</style>

<template>
  <button @click="chooseFiles">选择文件</button>
</template>
<script>
  import Logger from '../core/logger'
  import uploader from '../core/uploader'
  const logger = new Logger('reg')

  export default {
    name: 'step',
    props: [],
    created () {
      this.initUploader()
    },
    methods: {
      initUploader() {
        let me = this
        uploader.init({
          uploadUrl: '/upload',
          maxUploads: 10,
          multiple: false,
          selected(data) {
            me.onSelected(data)
          },
          progress(data) {
            me.onProgress(data)
          },
          fail(data) {
            me.onFail(data)
          },
          success(data) {
            me.onSuccess(data)
          }
        })
      },
      onSelected(data) {
        logger.debug('onSelected', data)
      },
      onProgress(data) {
        logger.debug('onProgress', data)
      },
      onFail(data) {
        logger.debug('onFail', data)
        if (this.failCallback) this.failCallback(data)
      },
      onSuccess(data) {
        logger.debug('onSuccess', data)
        if (this.successCallback) this.successCallback(data)
      },
      chooseFiles() {
        logger.debug('chooseFiles')
        uploader.chooseFiles()
      },
      uploadFiles(files) {
        logger.debug('uploadFiles', files)
        uploader.uploadFiles(files)
      },
      reset() {
        logger.debug('reset')
        uploader.reset()
      },
      onClick(n) {
        this.$emit('stepChanged', n)
      }
    }
  }
</script>
