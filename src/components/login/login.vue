<template>
  <div id="myLogin">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" class="myInput" placeholder="请验证码码"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </el-form-item>
        <el-checkbox :value="1>0">我已同意协议</el-checkbox>
        <el-button type="primary" class="myBtn" @click="myLogin">立即创建</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/untils'
export default {
  data () {
    var myValid = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      form: {
        mobile: '15711111111',
        code: '246810'
      },
      rules: {
        name: [
          { required: true, message: '请输入正确的手机号', trigger: 'blur' },
          { validator: myValid, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    myLogin () {
      this.$refs.form.validate(async valid => {
        try {
          let result = await this.$axios({
            url: 'authorizations',
            method: 'post',
            data: this.form
          })
          local.setData(result)
          this.$router.push('/')
        } catch (e) {

        }
      })
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
