<style lang="css">
  .check-box {
    width: 11px;
    height: 11px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    overflow: hidden;
    background:#ffffff;
    border:1px solid #9b9b9b;
    vertical-align: -2px;
  }
  .check-box i {
    background-position: center center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 12px;
    height: 12px;
  }
  .check-box i input{
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .checked i {
    background-image: url('../images/check-mark.png');
  }
</style>

<template>
  <div>
    <div :class="['check-box',{checked: checked}]">
      <i><input type="checkbox" :checked="checked" :name="name" @change="onChange"></i>
    </div>
    <slot></slot>
  </div>

</template>

<script>
  export default {
    name: 'checkbox',
    props: ['name', 'checked', 'label'],
    data () {
      return {
      }
    },
    methods: {
      onChange(e) {
        this.$emit('changed', e.target.checked)
      }
    }
  }
</script>