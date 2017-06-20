<style lang="stylus">
  .page-cos
    height 100%
</style>

<template>
  <div class="page-cos">
    <cos-uploader />
  </div>
</template>

<script>
  import CosUploader from '../containers/CosUploader.vue'
  export default {
    name: 'cos',
    metaInfo: {
      title: 'COS上传'
    },
    data () {
      return {
        progress: 0,
        files: [],
        error: {},
      }
    }, 
    components: {
      CosUploader
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
