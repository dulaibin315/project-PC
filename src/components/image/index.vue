<template>
  <el-card>
    <div slot="header">
      <Crumb>素材管理</Crumb>
    </div>
    <div>
      <el-radio-group v-model="myObj.collect" size="small" @change="myBtn">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" size="small" style="float:right" @click="dialogVisible=true">
        添加素材
        <el-dialog title="添加素材" :visible.sync="dialogVisible" width="400px">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-dialog>
      </el-button>
    </div>
    <!-- <el-item> -->
    <div class="myDv" v-for="item in myList" :key="item.id">
      <img :src="item.url" alt />
      <div class="myCover">
        <span class="el-icon-star-off" :class="{current:item.is_collected} " @click="myShou(item)"></span>
        <span class="el-icon-delete" @click="myDEL(item)"></span>
      </div>
    </div>
    <!-- </el-item> -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="myList.length%this.myObj.per_page+1"
      @current-page="myChange"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      myObj: {
        collect: false,
        page: 1,
        per_page: 10
      },
      myList: [],
      dialogVisible: false,
      imageUrl: ''
    }
  },
  created () {
    this.myData()
  },
  methods: {
    async myData () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.myObj })
      this.myList = data.results
      console.log(data)
    },
    myChange (newPage) {
      this.myObj.page = newPage
      this.myData()
    },
    myBtn () {
      this.myData()
    },
    async myShou (item) {
      const {
        data: { data }
      } = await this.$axios.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      item.is_collected = data.collect
    },
    async myDEL (item) {
      await this.$axios.delete(`user/images/${item.id}`)
      this.myData()
    },
    myAdd () {}
  }
}
</script>

<style scoped lang='less'>
.current {
  color: red;
}
.myDv {
  width: 220px;
  height: 240px;
  margin-top: 20px;
  position: relative;
  display: inline-block;
  margin: 50px;
  img {
    width: 100%;
    height: 100%;
  }
  .myCover {
    width: 100%;
    height: 30px;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    bottom: 0;
    line-height: 30px;
    span {
      margin: 0 36px;
    }
  }
}
</style>
