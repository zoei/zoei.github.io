<style lang='stylus'>
.markdown-editor
  background-color #fff
  font-family: "Fira Sans", "Verdana", "Geneva", sans-serif, cursive;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: solid 1px #ededed;
  border-radius: 3px;
  .header
    height 40px
    line-height 40px
    background: #fff;
    box-shadow: 0px 1px 3px #d2d2d2;
    z-index 1
    .title
      margin-left: 15px;
      color: #6b6b6b;
      font-size: 18px;
      font-family: cursive;
  .tool-bar
    height 40px
    line-height 40px
    background: #fff;
    border-bottom: solid 1px #d2d2d2;
    .fa
      margin-left 5px
      cursor pointer
  .main-content
    flex 1
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: stretch
    .code,.previewer
      overflow auto
    .previewer
      flex 1
      height 100%
      border-left solid 1px #ededed
      padding 10px
      pre
        background-color #000
        padding 20px
        border-radius 5px
        color #fff
        overflow auto
        code
          color #fff
  .status-bar
    height 25px
    background: #fafafa;
    border-top solid 1px #f1f1f1
</style>

<template>
  <div class="markdown-editor">
    <!--<div class="header"><span class="title">Markdown编辑器</span></div>-->
    <div class="tool-bar">
      <i class="fa fa-bold"></i>
      <i class="fa fa-italic"></i>
      <i class="fa fa-strikethrougn"></i>
      <i class="fa fa-underline"></i>
      <i class="fa fa-header"></i>
      <i class="fa fa-list-ol"></i>
      <i class="fa fa-list-ul"></i>
      <i class="fa fa-link"></i>
      <i class="fa fa-table"></i>
      <i class="fa fa-eye" @click="togglePreview"></i>
      <i class="fa fa-columns" @click="togglePreviewMode"></i>
      <i class="fa fa-save" @click="save"></i>
      <i class="fa fa-undo"></i>
    </div>
    <div class="main-content">
      <code-mirror v-show="!previewVisible || previewMode !== 'cover'" @change="change" :options="options"/>
      <div v-show="previewVisible" class="previewer" ref="previewer"></div>
    </div>
    <div class="status-bar"></div>
  </div>
</template>

<script>
  import CodeMirror from './CodeMirror.vue'
  import 'codemirror/addon/display/placeholder.js'
  import 'codemirror/addon/selection/mark-selection.js'
  import 'codemirror/mode/markdown/markdown.js'
  import 'codemirror/mode/gfm/gfm.js'
  import 'codemirror/mode/xml/xml.js'
  // import 'simplemde/src/css/simplemde.css'
  import marked from 'marked'

  export default {
    props: {
      initValue: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        options: {
          value: this.$props.initValue
        },
        previewMode: 'cover', // split
        previewVisible: false,
        content: this.$props.initValue
      }
    },
    components: {
      CodeMirror
    },
    mounted() {
      marked.setOptions({
        renderer: new marked.Renderer(),
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
      this.$refs.previewer.innerHTML = marked(this.content)
    },
    computed: {
    },
    watch: {
    },
    methods: {
      change(v) {
        this.content = v
        this.$refs.previewer.innerHTML = marked(v)
        this.$emit('change', v)
      },
      togglePreview() {
        this.previewVisible = !this.previewVisible
      },
      togglePreviewMode() {
        this.previewMode = this.previewMode === 'cover' ? 'split' : 'cover'
        if (this.previewMode === 'split' && !this.previewVisible) {
          this.previewVisible = true
        } else if (this.previewMode === 'cover' && this.previewVisible) {
          this.previewVisible = false
        }
      },
      save() {
        this.$emit('save', this.content)
      }
    }
  }
</script>