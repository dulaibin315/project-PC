<template>
  <div class="container"></div>
</template>

<script>
export default {
  created () {
    this.$axios.get('articles').then(res => {
      console.log(res.data)
    }).catch(() => {
      console.log('error')
    })
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background: url("../../assets/welcome.jpg") no-repeat center;
}
</style>
