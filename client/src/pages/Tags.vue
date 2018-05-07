<style lang="stylus">
  .page-tags
    height 100%
    .tag
      padding 8px 16px
      background #efefef
      border-radius 30px
      margin-right 10px
</style>

<template>
  <div class="page-tags">
    <div>
      <span v-for="tag in tagList" :key="tag._id" class="tag">
        <a :href="'/doc?tag=' + tag.tag">{{tag.tag}}</a>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    metaInfo: {
      title: '文档列表'
    },
    data () {
      return {
        docList: [],
        tagList: []
      }
    }, 
    components: {
    },
    async created() {
      let { data } = await fetch('/api/doc/tags?limit=999').then(res=>res.json())
      this.tagList = data
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
