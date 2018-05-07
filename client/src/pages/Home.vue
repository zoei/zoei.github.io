<style lang="stylus">
  .page-home
    height 100%
    .toc-list
      margin-top 40px
    ul li
      margin-bottom: 40px;
      font-size: 16px;
      padding 10px 0
      border-bottom solid 1px #efefef
      .info
        color: #6b6b6b;
        margin-top 5px
      .title
        font-size: 24px;
        color: #000;
      .author
        font-size 18px
        color: #6b6b6b;
      .summary
        color: #666;
    .btn-del,.btn-mod
      cursor pointer
      margin-left 20px
    .tag
      padding 8px 16px
      background #efefef
      border-radius 30px
      margin-right 10px
</style>

<template>
  <div class="page-home">
    <div>
      <span v-for="tag in tagList" :key="tag._id" class="tag">
        <a :href="'/doc?tag=' + tag.tag">{{tag.tag}}</a>
      </span>
    </div>
    <!-- <router-link to="/doc/new"><i class="fa fa-plus"></i></router-link> -->
    <ul class="toc-list">
      <li v-for="doc in docList" :key="doc.id">
        <a :href="'/doc/' + doc.id" class="title">{{doc.title}}</a>
        <p>{{doc.summary}}</p>
        <div class="info">
          <span>{{doc.author}} : {{new Date(doc.createTime).toLocaleString()}}</span>
          <!-- <a class="btn-del" v-if="authentic" @click="deleteDoc(doc.id)"><i class="fa fa-remove"></i></a> -->
          <!-- <router-linkv-if="authentic" :to="'/doc/' + doc.id + '/modify'" class="btn-mod"><i class="fa fa-edit"></i></router-link> -->
         </div>
      </li>
    </ul>
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
      let payload = await this.$store.dispatch('getDocs', { start: 0, limit: 5 })
      this.docList = payload.data
      payload = await fetch('/api/doc/tags').then(res=>res.json())
      this.tagList = payload.data
    },
    mounted() {
    },
    computed: {
      ...mapState({
        authentic(state) { return state.authentic }
      })
    },
    watch: {
    },
    methods: {
      async deleteDoc(id) {
        let payload = await this.$store.dispatch('deleteDoc', { id })
        this.docList = this.docList.filter(doc=>doc.id !== id)
      }
    }
  }
</script>
