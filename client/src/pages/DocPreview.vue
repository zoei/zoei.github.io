<style lang="stylus">
  .doc-comment
    margin-top 50px
</style>

<template>
  <div class="">
    <markdown-preview :id="id"/>
    <Comment :docId="id" class="doc-comment" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import MarkdownPreview from '../components/MarkdownPreview.vue'
  import Comment from '../components/comment/CommentList.vue'
  import fetch from '../core/fetch'

  export default {
    metaInfo: {
      title: '预览文档'
    },
    data () {
      return {
        id: this.$route.params.id,
        comment: ''
      }
    }, 
    components: {
      MarkdownPreview,
      Comment
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
