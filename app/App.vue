<style lang="stylus">
.page
  max-width: 1280px
  margin: 0 auto
.page-doc
  max-width: 960px
  margin: 0 auto
</style>

<template>
  <div class="app">
    <router-view class="page"></router-view>
  </div>
</template>

<script>
  import { getContext } from './context'

  export default {
    name: 'app',
    data () {
      return {
      }
    },
    components: {
    },
    created() {
    },
    ready() {
    },
    methods: {
    }
  }
</script>
