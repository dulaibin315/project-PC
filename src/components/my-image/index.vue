<template>
  <div class="current">
    <div @click="myOpen" class="myDiv">
      <img :src="value||mySrc" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" title="请选择要上传的图片" width="750px">
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="素材库" name="source">
          <el-radio-group
            @change="myBtn"
            size="small"
            style="display:block"
            v-model="myObj.collect"
          >
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <div
            :class="{myCover:item.url==mySelect}"
            :key="item.id"
            @click="myChose(item.url)"
            class="box"
            v-for="item in myList"
          >
            <img :src="item.url" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="本地上传" name="upload">
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
        </el-tab-pane>
      </el-tabs>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="mySure" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mySrc from '../../assets/default.png'
import myUser from '@/untils'
export default {
  props: ['value'],
  data () {
    return {
      myObj: {
        collect: false,
        page: 1,
        per_page: 8
      },
      myList: [],
      mySrc,
      imageUrl: '',
      dialogVisible: false,
      headers: { Authorization: `Bearer ${myUser.getData().token}` },
      mySelect: '',
      activeName: 'source'
    }
  },
  methods: {
    myBtn () {
      this.myData()
    },
    myOpen () {
      this.dialogVisible = true
      this.myData()
    },
    async myData () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.myObj })
      this.myList = data.results
      console.log(data)
    },
    mySure () {
      this.dialogVisible = false
      if (this.mySelect) {
        this.mySrc = this.mySelect
        this.$emit('input', this.mySrc)
      } else {
        this.mySrc = this.imageUrl
        this.$emit('input', this.imageUrl)
        this.imageUrl = ''
      }
    },
    fn (res) {
      this.imageUrl = res.data.url
    },
    myChose (url) {
      this.mySelect = url
    }
  }
}
</script>

<style scoped lang='less'>
.myDiv {
  width: 200px;
  height: 200px;
  border: 1px dashed #999;
  img {
    width: 100%;
    height: 100%;
  }
}
.box {
  width: 160px;
  height: 200px;
  background-color: pink;
  display: inline-block;
  margin-right: 10px;
  margin-top: 20px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  &.myCover::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3) url('../../assets/selected.png') no-repeat
      center/50px 50px;
  }
}
</style>
