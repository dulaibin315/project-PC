<template>
  <div class="container">
    <el-card>
      <el-header slot="header">
      <Crumb>内容管理</Crumb>
      </el-header>
      <el-form label-width="80px">
        <el-form-item label="状态:">
          <el-radio-group v-model="radio">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <el-select v-model="mySelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: null,
      value1: [],
      options: [
        {
          value: '选项1',
          label: '科技类'
        },
        {
          value: '选项2',
          label: 'IT类'
        }
      ],
      mySelect: ''
    }
  }
}
</script>

<style scoped lang='less'></style>
