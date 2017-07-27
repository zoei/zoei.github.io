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
      font-size 18px
      color: #333;
    .md-preview
      flex 1
      overflow auto
</style>

<template>
  <div class="page-home">
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'home',
    metaInfo: {
      title: '酌酒花间'
    },
    data () {
      return {
      }
    }, 
    components: {
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
    }
  }
</script>
