<style lang="stylus">
  .step
    display inline-block
    width 200px
    height 38px
    .inner
      display flex
      flex-direction row
      align-items center
    .dot
      display inline-block
      width 20px
      height 20px
      line-height 20px
      border-radius 10px
      text-align center
      background-color #d8d8d8
      font-family PingFangSC-Medium
      font-size 13px
      color #ffffff
      :after
        content: attr(label)
        font-family:PingFangSC-Regular;
        font-size:10px;
        color:#9b9b9b;
        float: left;
        margin-left: 50%;
        white-space: nowrap;
        transform: translateX(-50%);
      &.active
        background-color #7ed321
        :after
          color #7ed321
    .line
      display inline-block
      flex 1
      height 2px
      background-color #d8d8d8
      text-align left
      span
        display inline-block
        width 0
        height 100%
        vertical-align top
        background-color #7ed321
        transition width .2s
      &.active
        span
          width 100%

</style>

<template>
  <div class="step">
    <div class="inner">
      <span :class="{line: n % 2 === 0, dot: n % 2 !== 0, active: current >= (n + 1) / 2}" v-for="n in steps.length * 2 - 1">
        <span :label="steps[(n - 1) / 2]" v-if="n % 2 !== 0" @click="()=>onClick((n + 1) / 2)">{{ n % 2 !== 0 ? (n + 1) / 2 : '' }}</span>
        <span v-else></span>
      </span>
    </div>
  </div>
</template>
<script>
// <span>{{steps[(n + 1) / 2]}}</span>
  export default {
    name: 'step',
    props: ['steps', 'current', 'width'],
    methods: {
      onClick(n) {
        this.$emit('stepChanged', n)
      }
    }
  }
</script>
