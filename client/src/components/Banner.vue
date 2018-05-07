<style lang="stylus">
  .banner
    margin-top 15px
    position: relative;
    padding-top: 56.72%;
    .mint-swipe
      position: absolute;
      top: 0;
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      .mint-swipe-indicators
        left auto
        right 0
        bottom 5px
        .mint-swipe-indicator
          width 6px
          height 6px
          background-color:#d8d8d8;
          opacity 1
          margin 0 2px
          &.is-active
            background-color #7ed321
      .pic
        width 100%
        height 100%
        background-size cover
        background-position center
        background-repeat no-repeat
      .bottom-info
        position absolute
        left 0
        right 0
        bottom 0
        width 100%
        height 28px
        line-height 28px
        background-image:linear-gradient(-180deg, rgba(35,35,35,0.00) 0%, rgba(46,46,46,0.84) 51%, #050404 100%);
        font-family:PingFangSC-Medium;
        font-size:12px;
        color:#ffffff;
        padding: 0 5px;
</style>

<template>
  <div class="banner">
    <mt-swipe :auto="6000">
      <mt-swipe-item v-for="(pic,i) in items" :key="i">
        <router-link :to="pic.link">
          <div class="pic" :style="{ 'background-image': `url(${pic.url})`}"></div>
          <div class="bottom-info">{{pic.title}}</div>
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    name: 'banner',
    props: ['items'],
  }
</script>
