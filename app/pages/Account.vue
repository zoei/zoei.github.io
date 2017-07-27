<style lang="stylus">
</style>

<template>
  <div class="">
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    metaInfo: {
      title: '酌酒花间'
    },
    data () {
      return {
        username: '',
        password: ''
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
      async signin() {
        const { username, password } = this
        try {
          let user = await this.$store.dispatch('signin', { username, password })
          this.$router.replace('/')
        } catch (e) {
          console.log('login error', e)
        }
      },
      async signup() {
        const { username, password } = this
        try {
          let user = await this.$store.dispatch('signup', { username, password })
          this.$router.replace('/')
        } catch (e) {
          console.log('login error', e)
        }
      }
    }
  }
</script>
