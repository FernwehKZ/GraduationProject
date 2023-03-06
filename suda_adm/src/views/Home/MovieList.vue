<template>
  <div id="movie-manage">
    <div class="top">
      <el-input  placeholder="请输入内容" class="input-with-select" style="width: 20%">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>

    </div>

    <div class="movie-table">
      <el-table
          border
          :data="movieInfo">
        <el-table-column
            label="影片 ID"
            align="center"
            width="100"
            prop="_id">
        </el-table-column>
        <el-table-column
            label="影片海报"
            align="center"
            prop="icon">
          <template v-slot="scope">
            <img :src="scope.row.icon" style=" width: 140px;height: 200px">
          </template>
        </el-table-column>
        <el-table-column
            label="影片名称"
            show-overflow-tooltip
            prop="name">
        </el-table-column>
        <el-table-column
            label="影片类别"
            show-overflow-tooltip
            prop="category">
        </el-table-column>
        <el-table-column
            label="导演"
            prop="director">
        </el-table-column>
        <el-table-column
            label="主演"
            prop="actor">
        </el-table-column>
        <el-table-column
            label="类型"
            align="center"
            width="100"
            prop="category">
        </el-table-column>
        <el-table-column
            label="上映时间"
            prop="date">
        </el-table-column>
        <el-table-column
            label="价格"
            prop="price">
        </el-table-column>
        <el-table-column
            width="200"
            align="center"
            label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="movieEdit(scope.$index,scope.row)">
              编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="remove(scope.$index,scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--dialog-->
    <div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
                 :showClose="false" width="25%">
        <el-form :model="movieInfo" @submit.native.prevent="editSave(movieInfo)">
          <el-form-item label="影片名称">
            <el-input v-model="movieInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="影片类别" >
            <el-select v-model="movieInfo.category" multiple placeholder="请选择" @focus="categoryFetch">
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
              <img v-if="movieInfo.icon" :src="movieInfo.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="导演" >
            <el-input v-model="movieInfo.director" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="主演" >
            <el-input v-model="movieInfo.actor" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" >
            <el-input v-model.number="movieInfo.price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="上映日期" >
              <el-date-picker
                  v-model="movieInfo.date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd">
              </el-date-picker>
          </el-form-item>
            <el-form-item label="影片介绍" >
              <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="movieInfo.introduce">
              </el-input>
            </el-form-item>

<!--          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </el-form-item>

        </el-form>
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--          <el-button type="primary"-->
<!--                     @click="save(movieInfo)"-->
<!--                     native-type="submit">保存</el-button>-->
<!--        </div>-->
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MovieList',
  data() {
    return {
      // imageURL: '',
      options: [],
      movieInfo: [],
      movieData: {},
      dialogTitle: '添加影片',
      dialogFormVisible: false,
      form: {
        // name: '',
        // region: '',
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: ''
      },
    }


  },
  methods: {
    // 展示电影信息
    async fetch() {
      const res = await this.$http.get('/movie')
      this.movieInfo = res.data
    },
    //获取类别列表
    async categoryFetch(){
      const res = await this.$http.get('/category')
      this.options = res.data
    },
    //修改影片信息
    async editSave() {
      const res = await this.$http.put('/movie', this.movieInfo)// eslint-disable-line no-unused-vars
      await this.$router.go(0)
      this.$message({
        type: 'success',
        message: '添加成功',
      })
    },
    //编辑按钮事件
    movieEdit(index, row){
      this.movieInfo = row
      this.name = row.name
      this.dialogFormVisible = true
    },
    //删除电信信息
    async remove(index, row) {
      this.$confirm(`此操作将删除电影信息"${row.name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/movie`, {data: {_id: row._id}}) // eslint-disable-line no-unused-vars
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.$router.go(0)
      })
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
   },
  // 自动执行
  created() {
    this.fetch()
  },
}
</script>


<style scoped>
.top {
  display: flex;
  margin-left:5%;
  justify-content: center;
  align-items:center;
  padding: 30px 0;
  margin-bottom: 30px;
}
.movie-table {
  width: 90%;
  min-width: 900px;
  margin: 0 auto 30px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 140px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 200px;
  display: block;
}

</style>