<style lang="stylus">
  .video-container
    position: relative;
    padding-top: 56.25%;
    .video-wrapper
      position: absolute;
      top: 0;
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      background-size cover
      background-repeat: no-repeat;
      background-position center
      video
        width 100%
        height 100%
      .cover
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color rgba(0,0,0,.5)
      .icon-play
        width 40px
        height 40px
        background-image url(../images/play.png)
        cursor: pointer;

</style>

<template>
  <div class="video-container">
    <div class="video-wrapper" :style="{'background-image': `url(${poster})` }">
      <video
        v-if="touchedPlay"
        class="video"
        controls="controls"
        preload="preload"
        :poster="poster"
        webkit-playsinline
        @loadstart="onLoadStart"
        @play="onPlay"
        :title="title"
        autoplay="autoplay"
        ref="video"
      >
        <source :src="source" type="video/mp4">
      </video>
      <div v-else class="cover">
        <span class="icon icon-play" @click="touchedPlay=true"></span>
      </div>
    </div>
  </div>
</template>

<script>
  // import Hls from 'hls.js'
  // import videojs from 'videojs-contrib-hls'
  import videojs from 'video.js'
  // console.log(videojs)
  // const Hls = videojs.Hls
  export default {
    name: 'program-video',
    props: {
      title: String,
      source: String,
      poster: String,
      enablePlay: Boolean
    },
    data () {
      return {
        touchedPlay: true,
        played: false,
        loadStarted: false,
        cachedState: 'pause'
      }
    },
    mounted() {
      // if (Hls.isSupported()) {
      //   let hls = this.hls = new Hls()
      //   hls.loadSource(this.$props.source)
      //   hls.attachMedia(this.$refs.video)
      //   hls.on(Hls.Events.MANIFEST_PARSED,function() {
      //     video.play()
      //   })
      // }
      let player = videojs(this.$refs.video);
      player.play()
    },
    ready () {
      this.video = this.$el;
    },
    watch: {
      sourceUrl(v) {
        // if (Hls.isSupported()) {
        //   let hls = this.hls = new Hls()
        //   hls.loadSource(v)
        //   hls.attachMedia(this.$refs.video)
        //   hls.on(Hls.Events.MANIFEST_PARSED,function() {
        //     video.play()
        //   })
        // }
      },
      enablePlay(val, oldVal) {
        if(!val) this.video.pause();
      },
      sourceUrl() {
        this.loadStarted = false;
      }
    },
    computed: {
      sourceUrl() {
        return this.$props.source
      }
    },
    methods: {
      play() {
        this.video.play();
      },

      load() {
        this.video.pause();
      },

      cacheStateAndPause() {
        this.cachedState = this.video.paused ? 'pause' : 'play';
        this.video.pause();
      },

      recoveryState() {
        if(this.cachedState === 'play') {
          this.video.play();
        } else if(this.cachedState === 'pause') {
          this.video.pause();
        }
      },

      onLoadStart() {
        this.played = false
      },

      onPlay() {
        this.loadStarted = true
        this.played = true;
      },

      isLoading() {
        return this.loadStarted;
      }
    }
  }
</script>