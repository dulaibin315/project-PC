<template>
  <el-card>
    <div slot="header">
      <Crumb>评论管理</Crumb>
    </div>
    <el-table :data="myComment">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.comment_status?'正常':'关闭'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="myChange(scope.row)" type="danger" v-if="scope.row.comment_status">关闭评论</el-button>
          <el-button @click="myChange(scope.row)" type="success" v-else>打开评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="1000" background layout="prev, pager, next"></el-pagination>
  </el-card>
</template>

<script>
export default {
  created () {
    this.getComment()
  },
  data () {
    return {
      myComment: [],
      total_count: null
    }
  },
  methods: {
    async getComment () {
      let hhh = await this.$axios.get('articles', {
        params: { response_type: 'comment', page: 1, per_page: 20 }
      })
      this.myComment = hhh.data.data.results
    },
    async myChange (obj) {
      const {
        data: { data }
      } = await this.$axios.put(`comments/status?article_id=${obj.id}`, {
        allow_comment: !obj.comment_status
      })
      this.$message.success(
        data.allow_comment ? '打开评论成功' : '关闭评论成功'
      )
      obj.comment_status = data.allow_comment
    }
  }
}
</script>

<style scoped lang='less'></style>
