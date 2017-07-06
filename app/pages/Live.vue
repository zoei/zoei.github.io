<style lang="stylus">
  .page-cos
    height 100%
</style>

<template>
  <div class="page-cos">
    <video-player :source="videoUrl" :poster="poster" />
  </div>
</template>

<script>
  import VideoPlayer from '../components/LiveVideoPlayer.vue'
  export default {
    name: 'cos',
    metaInfo: {
      title: '直播'
    },
    data () {
      return {
        videoUrl: `http://pili-live-hls.live.zoei.cc/z-live/${this.$route.params.id}.m3u8`,
        poster: `http://pili-live-snapshot.live.zoei.cc/z-live/${this.$route.params.id}.jpg`,
      }
    }, 
    components: {
      VideoPlayer
    },
    mounted() {

    },
    methods: {
    }
  }
</script>
