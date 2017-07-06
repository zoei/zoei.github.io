<style lang="stylus">
  .page-new-doc
    height 100%
</style>

<template>
  <div class="page-home">
    <home-header />
    <markdown-editor />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HomeHeader from '../components/Header.vue'
  import MarkdownEditor from '../components/MarkdownEditor.vue'

  export default {
    metaInfo: {
      title: '新建文档'
    },
    data () {
      return {
      }
    }, 
    components: {
      HomeHeader,
      MarkdownEditor
    },
    mounted() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
    }
  }
</script>
