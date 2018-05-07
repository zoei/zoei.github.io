<style lang="stylus">
.btn-login
  cursor: pointer;
  padding 0 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #5fcd5f;
  color: #fff;
  display: inline-block;
  border-radius: 5px;
  font-size: 16px;
</style>

<template>
  <div class="">
    <div><input type="text" v-model="username" /></div>
    <div><input type="password" v-model="password" /></div>
    <a class="btn-login" @click="signin" >登录</a>
    <a class="btn-login" @click="signup" >注册</a>
    <a class="btn-login" href="/auth/github" >使用Gitgub登录</a>
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
