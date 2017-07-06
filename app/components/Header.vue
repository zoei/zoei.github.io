<style lang="stylus">
  .home-layout
    color #198be5
</style>

<template>
  <div class="home-layout">
    <router-link to="/">首页</router-link>
    <router-link to="/upload/3">上传</router-link>
    <router-link to="/doc">文档列表</router-link>
    <router-link to="/doc/new">新文档</router-link>
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
