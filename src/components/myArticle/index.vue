<template>
  <el-card>
    <div slot="header">
      <Crumb>{{this.$route.query.id?'编辑文章':'文章管理'}}</Crumb>
    </div>
    <el-form label-width="180px">
      <el-form-item label="标题:">
        <el-input style="width:48%" v-model="myData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <quillEditor :options="mySeting" v-model="myData.content"></quillEditor>
      </el-form-item>
      <el-form-item label="封面:">
        <el-radio-group v-model="myData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <el-form-item style="margin-top:20px" v-if="myData.cover.type==1">
          <my-image style="display:inline-block" v-model="myData.cover.images[0]"></my-image>
        </el-form-item>
        <el-form-item style="margin-top:20px" v-if="myData.cover.type==3">
          <my-image
            :key="item"
            style="display:inline-block"
            v-for="item in 3"
            v-model="myData.cover.images[0]"
          ></my-image>
        </el-form-item>
      </el-form-item>
      <el-form-item label="频道：">
        <Channel v-model="myData.channel_id"></Channel>
      </el-form-item>
      <el-form-item>
        <el-button @click="toggle(false)" type="primary">{{this.$route.query.id?'修改':'发表'}}</el-button>
        <el-button @click="toggle(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入富文本的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import myUser from '@/untils'
// import mySrc from '../../assets/default.png'
export default {
  components: {
    quillEditor
  },
  async created () {
    if (this.$route.query.id) {
      let hhh = await this.$axios.get(`articles/${this.$route.query.id}`)
      this.myData = hhh.data.data
    }
  },
  data () {
    return {
      myData: {
        title: null,
        content: null,
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      },
      headers: { Authorization: `Bearer ${myUser.getData().token}` },
      // radio: 1,
      mySeting: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  methods: {
    async toggle (myB) {
      await this.$axios.post(`articles?draft=${myB}`, this.myData)
      this.$message.success(myB ? '成功保存为草稿' : '发布成功')
      this.$router.push('/article')
    }
  },
  watch: {
    '$route.query.id': function () {
      this.myData = {
        title: null,
        content: null,
        channel_id: null,
        cover: {
          type: 1,
          images: []
        }
      }
    },
    myBtn () {
      this.myData()
    },
    myChose (url) {
      this.mySelect = url
    }
  }
}
</script>

<style scoped lang='less'>
</style>
