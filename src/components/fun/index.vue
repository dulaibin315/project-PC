<template>
  <div class="container">
    <el-card>
      <Crumb>粉丝管理</Crumb>
      <el-tabs style="margin-top:20px" type="card" v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <div :key="item.id.toString()" class="myDiv" v-for="item in fanList.results">
            <div>
              <el-avatar :size="88" :src="item.photo"></el-avatar>
            </div>
            <p>{{item.name}}</p>
            <el-button plain size="small" type="primary">关注+</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        :page-count="parseInt(fanList.total_count/21)+1"
        @current-change="fn"
        background
        layout="prev, pager, next"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  created () {
    this.getMsg()
  },
  mounted () {
    let current = this.$refs.main
    var myChart = echarts.init(current)

    myChart.setOption(this.option)
  },
  data () {
    return {
      activeName: 'first',
      fanList: {
        per_page: 21,
        page: 1,
        results: null,
        total_count: null
      },
      option: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    }
  },
  methods: {
    async getMsg () {
      const {
        data: { data }
      } = await this.$axios.get('followers', { params: this.fanList })
      this.fanList = data
      console.log(data)
    },
    fn (val) {
      this.fanList.page = val
      this.getMsg()
    }
  }
}
</script>

<style scoped lang='less'>
.myDiv {
  width: 180px;
  height: 200px;
  border: 1px dashed #999;
  display: inline-block;
  margin: 0 30px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
