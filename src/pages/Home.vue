<style lang="stylus">
  .page-home
    height 100%
  .md-editor
    width 100%
    height 100%
    display flex
    flex-direction row
    .md-input
      flex 1
      border: solid 1px #ededed;
      overflow auto
    .md-preview
      flex 1
      overflow auto
</style>

<template>
  <div class="page-home">
    <div class="md-editor">
      <textarea v-model="mdtext" class="md-input"/>
      <pre class="md-preview"><code class="language-markdown" ref="md"></code></pre>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import marked from 'marked'
  // import hljs from 'highlight.js'
  // import Prism from 'prismjs'

  export default {
    name: 'home',
    metaInfo: {
      title: '酌酒花间'
    },
    data () {
      return {
        mdtext: ``
      }
    }, 
    components: {
    },
    created() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
          return Prism.highlight(code, Prism.languages[lang])
          // return hljs.highlightAuto(code).value
        }
      })
    },
    mounted() {
      // hljs.initHighlightingOnLoad()
    },
    watch: {
      mdtext(v) {
        this.$refs.md.innerHTML = marked(v)
      }
    },
    methods: {
    }
  }
</script>
