<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <Crumb>个人设置</Crumb>
      </div>
    </el-card>
    <el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form label-width="80px">
            <el-form-item label="编号:">{{mymsg.id}}</el-form-item>
            <el-form-item label="手机号:">{{mymsg.mobile}}</el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="mymsg.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" v-model="mymsg.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="mymsg.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light myBox">
          <!-- <div class="myPic"> -->
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            class="avatar-uploader"
            style="margin:40px auto"
          >
            <img :src="mymsg.photo" class="avatar myPic" v-if="mymsg.photo" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
          <button>修改头像</button>
          <!-- </div> -->
        </div>
      </el-col>
    </el-col>
  </div>
</template>

<script>
export default {
  created () {
    this.getPerson()
  },
  data () {
    return {
      mymsg: {
        id: null,
        mobile: null,
        name: null,
        photo: null,
        email: null,
        intro: null
      }
    }
  },
  methods: {
    async getPerson () {
      let hhh = await this.$axios.get('user/profile')
      this.mymsg = hhh.data.data
    }
  }
}
</script>

<style scoped lang='less'>
.myBox {
  text-align: center;
}
</style>
