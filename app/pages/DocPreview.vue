<style lang="stylus">
  .page-new-doc
    height 100%
</style>

<template>
  <div class="page-doc">
    <home-header />
    <markdown-preview :id="id"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HomeHeader from '../components/Header.vue'
  import MarkdownPreview from '../components/MarkdownPreview.vue'

  export default {
    metaInfo: {
      title: '预览文档'
    },
    data () {
      return {
        id: this.$route.params.id
      }
    }, 
    components: {
      HomeHeader,
      MarkdownPreview
    },
    created() {
      
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
