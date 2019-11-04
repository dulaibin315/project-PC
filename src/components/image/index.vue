<template>
  <el-card>
    <div slot="header">
      <Crumb>素材管理</Crumb>
    </div>
    <div>
      <el-radio-group @change="myBtn" size="small" v-model="myObj.collect">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button @click="dialogVisible=true" size="small" style="float:right" type="success">
        添加素材
        <el-dialog :visible.sync="dialogVisible" title="添加素材" width="400px">
          <el-upload
            :headers="headers"
            :on-success="fn"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            class="avatar-uploader"
            name="image"
          >
            <img :src="imageUrl" class="avatar" v-if="imageUrl" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-dialog>
      </el-button>
    </div>
    <!-- <el-item> -->
    <div :key="item.id" class="myDv" v-for="item in myList">
      <img :src="item.url" alt />
      <div class="myCover">
        <span :class="{current:item.is_collected} " @click="myShou(item)" class="el-icon-star-off"></span>
        <span @click="myDEL(item)" class="el-icon-delete"></span>
      </div>
    </div>
    <!-- </el-item> -->
    <el-pagination
      :total="myList.length%this.myObj.per_page+1"
      @current-page="myChange"
      background
      layout="prev, pager, next"
    ></el-pagination>
  </el-card>
</template>

<script>
import myUser from '@/untils'
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
      imageUrl: '',
      headers: { Authorization: `Bearer ${myUser.getData().token}` }
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
    myAdd () {},
    fn (res) {
      this.imageUrl = res.data.url
      setTimeout(() => {
        this.dialogVisible = false
      }, 2000)
      this.myData()
    }
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
