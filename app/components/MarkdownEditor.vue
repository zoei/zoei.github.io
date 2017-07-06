<style lang="stylus">
.md
  .md-editor
    width 100%
    height 100%
    display flex
    flex-direction row
    .md-input
      flex 1
      border: solid 1px #ededed;
      overflow auto
      font-size 18px
      color: #333;
    .md-preview
      flex 1
      overflow auto
  .buttons
    .btn-save
      background-color green
      color #fff
      cursor pointer
</style>

<template>
  <div class="md">
  <div><input type="text" v-model="title" placeholder="标题" /></div>
  <div><input type="text" v-model="author" placeholder="作者" /></div>
  <div class="md-editor">
    <textarea v-model="content" class="md-input"/>
    <div class="md-preview"><div class="markdown" ref="md"></div></div>
  </div>
  <div class="buttons">
    <a class="btn-save" @click="save">保存</a>
  </div>
  </div>
</template>

<script>
  import marked from 'marked'

  export default {
    props: ['initId', 'initTitle', 'initAuthor', 'initContent'],
    data () {
      return {
        id: this.$props.initId,
        title: this.$props.initTitle,
        author: this.$props.initAuthor,
        content: this.$props.initContent
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
        highlight: function (code, lang = 'bash') {
          return Prism.highlight(code, Prism.languages[lang])
        }
      })
    },
    mounted() {
    },
    computed: {
    },
    watch: {
      content(v) {
        this.$refs.md.innerHTML = marked(v)
      }
    },
    methods: {
      async save() {
        const { id, title, author, content } = this
        console.log('id', id)
        let payload
        if (id) {
          payload = await this.$store.dispatch('updateDoc', { id, title, author, content })
        } else {
          payload = await this.$store.dispatch('createDoc', { title, author, content })
        }
        this.$router.push('/doc/' + payload.data.id)
      }
    }
  }
</script>
