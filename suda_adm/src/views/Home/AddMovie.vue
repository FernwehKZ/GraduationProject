<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增影片信息</span>
      </div>
      <!--        注册用户信息表单-->
      <el-form :model="movieData" @submit.native.prevent="save">
        <el-form-item label="影片名称">
          <el-input v-model="movieData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="影片类别" >
          <el-select v-model="movieData.category" multiple placeholder="请选择" @focus="categoryFetch">
            <el-option
                v-for="item in options"
                :key="item._id"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="影片海报:" >
          <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload/'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
            <img v-if="movieData.icon" :src="movieData.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="导演" >
          <el-input v-model="movieData.director" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="主演" >
          <el-input v-model="movieData.actor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" >
          <el-input v-model.number="movieData.price" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="上映日期" >-->
<!--          <el-date-picker-->
<!--              v-model="movieData.date"-->
<!--              type="datetimerange"-->
<!--              range-separator="至"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              value-format="yyyy-MM-dd">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
        <el-form-item label="影片介绍" >
          <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="movieData.introduce">
          </el-input>
        </el-form-item>

        <!--          </el-form-item>-->
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
<!--          <el-button>取 消</el-button>-->
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: "AddMovie",
  data(){
    return{
      options:[],
      movieData:{},
    }
  },
  methods:{
    //获取类别列表
    async categoryFetch(){
      const res = await this.$http.get('/category')
      this.options = res.data
    },
    // 新增电影信息
    async save() {
      //http://localhost:3000/admin/api/
      const res = await this.$http.post('/movie', this.movieData)// eslint-disable-line no-unused-vars
      this.$message({
        type: 'success',
        message: '添加成功',
      })
      await this.$router.push('/home/MovieList')
    },
    handleAvatarSuccess(res) {
      this.$set(this.movieData,'icon',res.url)
      this.movieData.icon = res.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  }
}
</script>

<style>

</style>