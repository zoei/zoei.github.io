<style lang="stylus">
.page
  width: 768px
  margin: 0 auto
  flex 1
</style>

<template>
  <div class="app">
    <app-header />
    <router-view class="page page-under-header"></router-view>
  </div>
</template>

<script>
  import AppHeader from './components/Header.vue'
  import { getContext } from './context'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
    components: {
      AppHeader
    },
    created() {
      this.$store.dispatch('auth')
    },
    ready() {
    },
    methods: {
    }
  }
</script>
