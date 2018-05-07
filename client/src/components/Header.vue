<style lang="stylus">
.header
  height: 100px;
  background: #f5f5f5;
  margin-bottom 20px
  box-shadow: 0px 1px 2px #dadada;
  .header-inner
    width 768px
    margin 50px auto 10px
    a
      color #000
      font-size 24px
      font-family: cursive;
      margin-right 30px
</style>

<template>
  <div class="header">
    <div class="header-inner">
      <router-link to="/">首页</router-link>
      <!--<router-link to="/cos">上传</router-link>-->
      <router-link to="/doc">文章</router-link>
      <router-link to="/tags">标签</router-link>
      <!--<router-link to="/doc/new">新文档</router-link>
      <router-link to="/signin">登录</router-link>
      <a href="/logout">登出</a>-->
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'homeLayout',
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>
