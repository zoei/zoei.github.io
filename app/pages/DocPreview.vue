<style lang="stylus">
</style>

<template>
  <div class="">
    <markdown-preview :id="id"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
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
