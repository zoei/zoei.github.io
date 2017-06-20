<style lang="stylus">
</style>

<template>
  <div>
    <span v-for="n in count">
      {{n}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'component',
    data () {
      return {}
    },
    props: ['count', 'active'],
    components: {
    },
    created() {
    },
    ready() {
    },
    methods: {
    }
  }
</script>
