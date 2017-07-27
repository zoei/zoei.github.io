<style lang="stylus">
.page
  .doc-editor
    height 100%
</style>

<template>
  <div class="">
    <doc-editor
      v-if="title && content"
      :init-id="id"
      :init-title="title"
      :init-author="author"
      :init-content="content"
      @save="save"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import DocEditor from '../components/DocEditor.vue'

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
      DocEditor
    },
    async created() {
      fetch('/static/docs/' + this.id + '.md').then(res=>res.text()).then(res=>this.content=res)
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
      async save({ title, author, content }) {
        const { id } = this
        let payload = await this.$store.dispatch('updateDoc', { id, title, author, content })
        this.$router.push('/doc/' + payload.data.id)
      }
    }
  }
</script>
