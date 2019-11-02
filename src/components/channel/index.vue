<template>
  <el-select placeholder="请选择" :value="value" @change="fn">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      options: []
      //   myVal: null
    }
  },
  created () {
    this.mySelect()
  },
  methods: {
    async mySelect () {
      let obj = await this.$axios.get('channels')
      this.options = obj.data.data.channels
      //   console.log(this.value)
    },
    fn (val) {
      // this.myVal=
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped lang='less'></style>
