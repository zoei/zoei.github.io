<style lang="stylus">
  .page-docs
    height 100%
    .toc-list
      margin-top 40px
    ul li
      margin-bottom 40px
      font-size 16px
      padding 10px 0
      border-bottom solid 1px #efefef
      .info
        color: #6b6b6b;
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
</style>

<template>
  <div class="page-docs">
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
        tag: this.$route.query.tag
      }
    }, 
    components: {
    },
    async created() {
      let payload = await this.$store.dispatch('getDocs', { start: 0, limit: 10, tag: this.$route.query.tag, keyword: this.$route.query.keyword })
      this.docList = payload.data
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
