<template>
  <div id="myLogin">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" class="myInput" placeholder="请验证码码"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </el-form-item>
        <el-checkbox :value="1>0">我已同意协议</el-checkbox>
        <el-button type="primary" class="myBtn">立即创建</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: ''
      }
    }
  }
}
</script>

<style lang='less'>
#myLogin {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/login_bg.jpg) no-repeat center/cover;
  .el-card {
    width: 480px;
    height: 400px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
  }
  img {
    display: block;
    margin: 0 auto 30px;
  }
  //   .el-button {
  //     width: 100%;
  //   }
  .myBtn {
    width: 100%;
  }
  .myInput {
    width: 315px;
    margin-right: 10px;
  }
}
</style>
