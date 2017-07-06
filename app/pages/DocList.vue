<style lang="stylus">
  .page-docs
    height 100%
    .btn-del,.btn-mod
      cursor pointer
      margin-left 20px
</style>

<template>
  <div class="page-docs">
    <home-header />
    <ul>
      <li v-for="doc in docList">
        <a :href="'/doc/' + doc.id">{{doc.title}} - {{doc.author}}</a>
        <a class="btn-del" @click="deleteDoc(doc.id)">x</a>
        <router-link :to="'/doc/' + doc.id + '/modify'"><a class="btn-mod">E</a></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HomeHeader from '../components/Header.vue'

  export default {
    metaInfo: {
      title: '文档列表'
    },
    data () {
      return {
        docList: []
      }
    }, 
    components: {
      HomeHeader
    },
    async created() {
      let payload = await this.$store.dispatch('getDocs', { start: 1, limit: 10 })
      this.docList = payload.data
    },
    mounted() {
    },
    computed: {
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
