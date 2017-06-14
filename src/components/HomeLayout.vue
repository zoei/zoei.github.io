<style lang="stylus">
  .home-layout
    .header
      display: flex;
      flex-direction: row;
      height: 42px;
      justify-content: flex-start;
      align-items: center;
      padding 0 10px
      background:#f7f7f7;
      .icon-wanyuan
        width 64px
        height 42px
        background-image url(../images/logo-wanyuan.png)
      .icon-sqljjh
        width 113px
        height 42px
        background-image url(../images/logo-sqljjh.png)
      .icon-user
        width 23px
        height 23px
        background-image url(../images/user.png)
      .rest
        flex 1
    .mint-navbar
      overflow auto
      background-image: linear-gradient(0deg, #d4d4d5 1px,transparent 2px);
      background-image: -webkit-linear-gradient(bottom,#d4d4d5 1px,transparent 2px);
      .mint-tab-item
        padding 7px 8px
        flex none
        .mint-tab-item-label
          font-size 15px
        a
          color #9b9b9b
        &.is-selected
          border-bottom: 2px solid #7ed321;
          margin-bottom 0
          a
            font-family:PingFangSC-Medium;
            font-size:15px;
            color:#7ed321;
</style>

<template>
  <div
  class="home-layout"
  v-infinite-scroll="scrollEnd"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10"
  >
    <div class="header" v-if="showHeader">
      <router-link to="/"><span class="icon icon-wanyuan"></span></router-link>
      <router-link to="/"><span class="icon icon-sqljjh"></span></router-link>
      <span class="rest"></span>
      <router-link :to="authentic ? '/user' : '/signin'"><span class="icon icon-user"></span></router-link>
    </div>
    <div class="content" v-if="showHeader">
      <mt-navbar class="tabbar" v-model="activeId">
        <mt-tab-item id="1"><router-link to="/?fromHome=true">首页</router-link></mt-tab-item>
        <mt-tab-item id="2"><router-link to="/about?fromHome=true">公益</router-link></mt-tab-item>
        <mt-tab-item id="3"><router-link to="/movier?fromHome=true">小小电影人</router-link></mt-tab-item>
        <mt-tab-item id="4"><router-link to="/activityreg/step1">活动报名</router-link></mt-tab-item>
        <mt-tab-item id="5"><router-link to="/activity?fromHome=true">活动介绍</router-link></mt-tab-item>
        <mt-tab-item id="6"><router-link to="/album?fromHome=true">视频</router-link></mt-tab-item>
      </mt-navbar>
      <mt-tab-container class="tab-container" v-model="activeId">
        <mt-tab-container-item :id="activeId" class="content-news">
          <slot name="tab-content"></slot>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <slot name="tab-content" v-if="!showHeader"></slot>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'homeLayout',
    props: ['selected', 'showHeader'],
    data () {
      return {
        activeId: this.selected
      }
    },
    computed: {
      ...mapState({
        authentic(state) { return state.wanyuan.authentic },
      })
    },
    methods: {
      scrollEnd() {
        this.$emit('scrollend')
      }
    }
  }
</script>
