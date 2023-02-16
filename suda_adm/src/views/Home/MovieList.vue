<template>
  <div id="movie-manage">
    <div class="top">
      <el-input  placeholder="请输入内容" class="input-with-select" style="width: 20%">
        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
      </el-input>
      <el-button type="primary" plain style="margin-left: 25px" @click="addMovie">添加影片</el-button>

    </div>

    <div class="movie-table">
      <el-table
          border
      >
<!--          :data="tableData">-->
        <el-table-column
            label="影片 ID"
            align="center"
            width="100"
            prop="movie_id">
        </el-table-column>
        <el-table-column
            label="影片图片"
            align="center"
            width="100"
            prop="movie_pic">
        </el-table-column>

        <el-table-column
            label="影片名称"
            show-overflow-tooltip
            prop="movie_name">
        </el-table-column>
        <el-table-column
            label="主演"
            prop="actor">
        </el-table-column>
        <el-table-column
            label="类型"
            align="center"
            width="100"
            prop="movie_type">
        </el-table-column>
        <el-table-column
            label="上映时间"
            prop="public_date">
        </el-table-column>
        <el-table-column
            width="200"
            align="center"
            label="操作">
          <template>
            <el-button
                size="mini">
              <!--            @click="handleEdit(scope.$index, scope.row)"-->
              编辑
            </el-button>
            <el-button
                size="mini"
                type="danger">
              <!--            @click="handleDelete(scope.$index, scope.row)"-->
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
        <el-form :model="form">
          <el-form-item label="影片名称">
            <el-input v-model="model.movie_name" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="影片海报" >-->
<!--            <el-upload-->
<!--                class="avatar-uploader"-->
<!--                action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                :show-file-list="false"-->
<!--                :on-success="handleAvatarSuccess"-->
<!--                :before-upload="beforeAvatarUpload">-->
<!--              <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--            </el-upload>-->
<!--          </el-form-item>-->
          <el-form-item label="主演" >
            <el-input v-model="model.movie_actor" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="影片类别" >-->
<!--            <el-select v-model="model.category" placeholder="请选择">-->
<!--              <el-option-->
<!--                  v-for="item in options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="价格" >
            <el-input v-model="model.movie_price" autocomplete="off"></el-input>
          </el-form-item>
<!--          <el-form-item label="上映日期" >-->
<!--            <el-date-picker-->
<!--                type="dates"-->
<!--                v-model="model.movie_date"-->
<!--                placeholder="选择一个或多个日期">-->
<!--            </el-date-picker>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="上映场次" >-->
<!--            <el-select v-model="model.movie_session" placeholder="请选择">-->
<!--              <el-option-->
<!--                  v-for="item in options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--              </el-option>-->
<!--            </el-select>-->
            <el-form-item label="影片介绍" >
              <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="model.movie_introduce">
              </el-input>
            </el-form-item>

<!--          </el-form-item>-->

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="dialogFormVisible = false;"
                     native-type="submit">保存</el-button>
        </div>
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
      // movieInfo: [],
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
      model: {
        movie_name:'',
        movie_actor:'',
        category:'',
        movie_price:'',
        movie_date:'',
        movie_session:'',
        movie_introduce:''
      },
    }


  },
  methods: {
    async save() {
      console.log("开始执行save")
      //http://localhost:3000/admin/api/
      const res = await this.$http.post('http://localhost:3000/admin/api/category', this.model)// eslint-disable-line no-unused-vars
      //跳转路由
      await this.$router.push('/home/movieList')
      this.$message({
        type: 'success',
        message: '保存成功',
      })
    },
    addMovie() {
      this.dialogTitle = '添加电影';
      this.movieInfo = {};
      this.dialogFormVisible = true
    },
//     handleAvatarSuccess(res, file) {
//       this.imageUrl = URL.createObjectURL(file.raw);
//     },
//     beforeAvatarUpload(file) {
//       const isJPG = file.type === 'image/jpeg';
//       const isLt2M = file.size / 1024 / 1024 < 2;
//
//       if (!isJPG) {
//         this.$message.error('上传头像图片只能是 JPG 格式!');
//       }
//       if (!isLt2M) {
//         this.$message.error('上传头像图片大小不能超过 2MB!');
//       }
//       return isJPG && isLt2M;
//     },
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>