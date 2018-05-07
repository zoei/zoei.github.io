<style lang="stylus">
.md-preview
  pre
    background-color #000
    padding 20px
    border-radius 5px
    color #fff
    overflow auto
    code
      color #fff
</style>

<template>
  <div class="md-preview">
    <div ref="md"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  // import '../styles/dinky.css'

  export default {
    props: ['id'],
    data () {
      return {
        mdtext: ''
      }
    }, 
    components: {
    },
    created() {
      fetch(this.filePath).then(res=>res.text()).then(res=>this.mdtext=res)
    },
    mounted() {
      let renderer = new marked.Renderer()
      marked.setOptions({
        renderer,
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang = 'bash') {
          return Prism.highlight(code, Prism.languages[lang])
        }
      })
    },
    computed: {
      filePath() {
        return '/public/docs/' + this.$props.id + '.md'
      }
    },
    watch: {
      mdtext(v) {
        this.$refs.md.innerHTML = marked(v)
      }
    },
    methods: {
      async save() {
        let payload = await this.$store.dispatch('saveDoc', { content: this.mdtext })
        console.log(res)
        this.$router.push('/doc/' + payload.data.fileName)
      }
    }
  }
</script>
