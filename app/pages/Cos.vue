<style lang="stylus">
  .page-cos
    height 100%
</style>

<template>
  <div class="page-cos">
    <home-header />
    <cos-uploader />
  </div>
</template>

<script>
  import CosUploader from '../containers/CosUploader.vue'
  import HomeHeader from '../components/Header.vue'
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
      CosUploader,
      HomeHeader
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
