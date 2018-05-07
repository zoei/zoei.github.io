<style lang="stylus">
.comment-wrapper
  max-width 768px
.comment-list
  margin-top 50px
.comment-item
  margin-top 20px
  border-bottom solid 1px #eee
.reply-action
  margin-left 40px
  float right
.reply-list
  padding-left 20px
  background #f0f0f0
.editor
  width 100%
  height 80px
  &.reply-editor
    height 24px
    margin-top 10px
.btn
  float right
</style>

<template>
  <div class="comment-wrapper">
    <div class="comment-editor-wrapper">
      <textarea v-model="newComment" class="editor comment-editor"/>
      <button @click="addComment" class="btn">评论</button>
    </div>
    <div class="comment-list">
      <div v-for="comment in commentList" :key="comment.id" class="comment-item">
        {{comment.content}}
        <a href="javascript:void(0)" @click="commentId=comment.id" class="reply-action">回复</a>
        <div class="reply-list">
          <div v-for="reply in comment.replies" :key="reply.id">{{reply.content}}</div>
        </div>
        <textarea v-if="commentId ===comment.id" v-model="newReply" class="editor reply-editor"/>
        <button v-if="commentId ===comment.id" @click="addReply" class="btn">回复</button>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from '../../core/fetch'
  export default {
    name: 'comment',
    props: ['docId'],
    data() {
      return {
        newComment: '',
        newReply: '',
        commentId: 0,
        commentList: []
      }
    },
    async mounted() {
      const { data } = await (await fetch(`/api/doc/${this.$props.docId}/comments`)).json()
      this.commentList = data
    },
    methods: {
      async addComment() {
        let { data } = await (await fetch('/api/comment', {
          method: 'POST',
          body: {
            docId: this.$props.docId,
            content: this.newComment
          }
        })).json()
        this.commentList = [{ replies: [], ...data }].concat(this.commentList)
        this.newComment = ''
      },
      async addReply() {
        let { data } = await (await fetch('/api/reply', {
          method: 'POST',
          body: {
            commentId: this.commentId,
            content: this.newReply
          }
        })).json()
        let currentComment = this.commentList.find(({ id })=>id === this.commentId)
        currentComment.replies.push(data)
        this.commentList = [].concat(this.commentList)
        this.commentId = 0
        this.newReply = ''
      }
    }
  }
</script>

