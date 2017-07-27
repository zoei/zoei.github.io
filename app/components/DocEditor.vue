<style lang="stylus">
.doc-editor
  display: flex;
  flex-direction: column;
  height 400px
  padding-bottom 50px
  box-sizing: border-box;
  > input[type="text"]
    margin-top 10px
  .markdown-editor
    flex 1
    margin: 10px 0;
  .buttons
    height 40px
    line-height 40px
    .btn-save
      background-color: #505050;
      color: #fff;
      cursor: pointer;
      padding: 5px 20px;
      border-radius: 5px;
</style>

<template>
  <div class="doc-editor">
    <input type="text" v-model="title" placeholder="标题" />
    <input type="text" v-model="author" placeholder="作者" />
    <markdown-editor :initValue="content" @change="contentChange" @save="save" />
    <div class="buttons">
      <a class="btn-save" @click="save">保存</a>
    </div>
  </div>
</template>

<script>
  import MarkdownEditor from '../components/MarkdownEditor.vue'

  export default {
    props: {
      initId: String,
      initTitle: {
        type: String,
        default: '新建文档'
      }, 
      initAuthor: {
        type: String,
        default: 'zoei'
      },
      initContent: String
    },
    data () {
      return {
        id: this.$props.initId,
        title: this.$props.initTitle,
        author: this.$props.initAuthor,
        content: this.$props.initContent
      }
    }, 
    components: {
      MarkdownEditor
    },
    async created() {
      // if (this.$props.initId) {
      //   fetch('/static/docs/' + this.id + '.md').then(res=>res.text()).then(res=>this.content=res)
      //   let payload = await this.$store.dispatch('getDoc', { id: this.id })
      //   const { title, author } = payload.data
      //   this.title = title
      //   this.author = author
      // }
    },
    methods: {
      contentChange(content) {
        this.content = content
      },
      save() {
        const { title, author, content } = this
        this.$emit('save', { title, author, content })
      }
    }
  }
</script>
