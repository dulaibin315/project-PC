<template>
  <el-container class="myContainer">
    <el-aside :width="isOk?'60px':'200px'">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002044"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isOk"
        :collapse-transition="false"
      >
        <div class="asilde-top" :class="{asildeTop:isOk}"></div>
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-folder"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-tickets"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-square"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="myClick"></span>
        <span class="myText">新闻资讯中心</span>
        <el-dropdown>
          <img :src="userData.photo" alt />
          <span class="el-dropdown-link">
            {{userData.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click.native='logout'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Local from '@/untils'
export default {
  created () {
    this.userData = Local.getData()
  },
  data () {
    return {
      isOk: true,
      userData: ''
    }
  },
  methods: {
    myClick () {
      this.isOk = !this.isOk
    },
    logout () {
      Local.delData()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
.myContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
      border-right: none;
      .asilde-top {
        // width: 200px;
        height: 60px;
        background: #002033 url("../../assets/logo_admin.png") no-repeat
          center/140px auto;
      }
      .asildeTop {
        width: 60px;
        background-image: url("../../assets/logo_admin_01.png");
        background-size: 36px auto;
      }
    }
  }
  .el-header {
    // background-color: darkcyan;
    width: 100%;
    height: 60px;
    line-height: 60px;
    span {
      font-size: 24px;
    }
    .myText {
      margin-left: 10px;
    }
    .el-dropdown {
      float: right;
      img {
        width: 36px;
        height: 36px;
        vertical-align: middle;
        border-radius:50%
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #000;
        font-size: 16px;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>
