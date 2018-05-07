<style lang="stylus">
.page
  .doc-editor
    height 100%
</style>

<template>
  <div class="">
    <doc-editor @save="save"/>
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
      }
    }, 
    components: {
      DocEditor
    },
    mounted() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
      async save({ title, author, content, tags }) {
        let payload = await this.$store.dispatch('createDoc', { title, author, content, tags })
        this.$router.push('/doc/' + payload.data.id)
      }
    }
  }
</script>
