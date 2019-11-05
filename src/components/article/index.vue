<template>
  <div class="container">
    <el-card>
      <el-header slot="header">
        <Crumb>内容管理</Crumb>
      </el-header>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="myObj.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <Channel v-model="myObj.channel_id"></Channel>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <el-date-picker
              @change="myDate"
              clearable
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="daterange"
              v-model="myObj.value"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="myScreen" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <el-header>
        <span>根据筛选条件共查询到 {{count}} 条结果:</span>
      </el-header>
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
                <div slot="error">
                  <img alt src="../../assets/error.gif" style="width:150px;height:100px" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-button type="info" v-if="scope.row.status==0">草稿</el-button>
              <el-button type="primary" v-if="scope.row.status==1">待审核</el-button>
              <el-button type="success" v-if="scope.row.status==2">审核通过</el-button>
              <el-button type="danger" v-if="scope.row.status==3">审核失败</el-button>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="pubdate"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="myEdit(scope.row.id)"
                circle
                icon="el-icon-edit"
                plain
                type="primary"
              ></el-button>
              <el-button
                @click="myDel(scope.row.id)"
                circle
                icon="el-icon-delete"
                plain
                type="danger"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        :total="this.count/this.myObj.per_page"
        @current-change="myPage"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.myLoad()
  },
  data () {
    return {
      myObj: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        per_page: 30,
        page: 1
      },
      count: 0,
      value: [],
      tableData: []
    }
  },
  methods: {
    async myLoad () {
      let myData = await this.$axios.get('articles', { params: this.myObj })
      this.tableData = myData.data.data.results
      this.count = myData.data.data.total_count
    },
    async myDel (id) {
      await this.$axios.delete(`articles/${id}`)
      this.myLoad()
    },
    myPage (current) {
      this.myObj.page = current
      this.myLoad()
    },
    myScreen () {
      this.myLoad()
    },
    myDate (val) {
      if (!val) {
        this.myObj.begin_pubdate = null
        this.myObj.end_pubdate = null
      } else {
        // console.log(val)
        this.myObj.begin_pubdate = val[0]
        this.myObj.end_pubdate = val[1]
      }
    },
    myEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    }
  }
}
</script>

<style scoped lang='less'></style>
