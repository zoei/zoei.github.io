<style lang='stylus'>
  .mde
    width 100%
</style>

<template>
  <textarea id="mde" class="mde" ref="mde"></textarea>
</template>

<script>
  import 'simplemde/src/css/simplemde.css'
  import SimpleMDE from 'simplemde'

  export default {
    name: 'homeLayout',
    data () {
      return {
      }
    },
    mounted() {
      let mde = new SimpleMDE({
        element: this.$refs.mde,
        // autofocus: true,
        // autosave: {
        //   enabled: true,
        //   uniqueId: 'MyUniqueID',
        //   delay: 1000,
        // },
        // blockStyles: {
        //   bold: '__',
        //   italic: '_'
        // },
        // forceSync: true,
        // hideIcons: [],
        // indentWithTabs: false,
        // initialValue: 'Hello world!',
        // insertTexts: {
        //   horizontalRule: ['', '\n\n-----\n\n'],
        //   image: ['![](http://', ')'],
        //   link: ['[', '](http://)'],
        //   table: ['', '\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n'],
        // },
        // lineWrapping: false,
        // parsingConfig: {
        //   allowAtxHeaderWithoutSpace: true,
        //   strikethrough: false,
        //   underscoresBreakWords: true,
        // },
        // placeholder: '',
        // previewRender: function(plainText) {
        //   return customMarkdownParser(plainText); // Returns HTML from a custom parser
        // },
        // previewRender: function(plainText, preview) { // Async method
        //   setTimeout(function(){
        //     preview.innerHTML = customMarkdownParser(plainText);
        //   }, 250);

        //   return 'Loading...';
        // },
        // promptURLs: true,
        // renderingConfig: {
        //   singleLineBreaks: false,
        //   codeSyntaxHighlighting: true,
        // },
        // shortcuts: {
        //   drawTable: 'Cmd-Alt-T'
        // },
        // showIcons: ['code', 'table'],
        // spellChecker: false,
        // status: false,
        // status: ['autosave', 'lines', 'words', 'cursor'], // Optional usage
        // status: ['autosave', 'lines', 'words', 'cursor', {
        //   className: 'keystrokes',
        //   defaultValue: function(el) {
        //     this.keystrokes = 0;
        //     el.innerHTML = '0 Keystrokes';
        //   },
        //   onUpdate: function(el) {
        //     el.innerHTML = ++this.keystrokes + ' Keystrokes';
        //   }
        // }], // Another optional usage, with a custom status bar item that counts keystrokes
        // styleSelectedText: true,
        // tabSize: 4,
        // toolbar: [
        //   'bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger',
        //   'heading-1', 'heading-2', 'heading-3', 'code', 'quote', 'unordered-list', 'ordered-list',
        //   'clean-block', 'link', 'image', 'table', 'horizontal-rule', 'preview',
        //   'side-by-side', 'fullscreen'
        // ],
        // toolbarTips: false,
        toolbar: false
      })
    },
    computed: {
    },
    methods: {
    }
  }
</script>
