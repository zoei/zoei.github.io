<style lang="stylus">
  .page-new-doc
    height 100%
</style>

<template>
  <div class="page-home">
    <home-header />
    <markdown-editor v-if="title && content" :init-id="id" :init-title="title" :init-author="author" :init-content="content" />
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
        id: this.$route.params.id,
        title: '',
        author: '',
        content: ''
      }
    }, 
    components: {
      HomeHeader,
      MarkdownEditor
    },
    async created() {
      fetch('http://z.me/static/docs/' + this.id + '.md').then(res=>res.text()).then(res=>this.content=res)
      let payload = await this.$store.dispatch('getDoc', { id: this.id })
      const { title, author } = payload.data
      this.title = title
      this.author = author
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
