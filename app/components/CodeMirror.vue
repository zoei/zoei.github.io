<style lang="stylus">
.code
  flex 1
  width 100%
  height 100%;
.CodeMirror
  height 100%
  background transparent
  padding: 10px;
  box-sizing: border-box
</style>

<template>
  <div class="code" ref="code"></div>
</template>

<script>
  import CodeMirror from 'codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/addon/edit/continuelist.js'
  import 'codemirror/addon/display/fullscreen.js'
  import 'codemirror/addon/display/fullscreen.css'
  import 'codemirror/addon/mode/overlay.js'

  export default {
    name: 'code-mirror',
    props: {
      options: {
        type: Object
      }
    },
    data () {
      return {
      }
    },
    mounted() {
      let editor = this.cm = CodeMirror(this.$el, {
        mode: 'gfm',
        extraKeys: {
          Enter: 'newlineAndIndentContinueMarkdownList',
	        Tab: 'tabAndIndentMarkdownList',
	        'Shift-Tab': 'shiftTabAndUnindentMarkdownList',
          'F11': function(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'))
          },
          // Esc键退出全屏
          'Esc': function(cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false)
          }
        },
        ...this.$props.options
      })
      editor.on('change', (cm, { from, to, text, next }) => {
        this.$emit('change', cm.getValue())
      })
      this.$emit('mounted', editor)
    }
  }
</script>
