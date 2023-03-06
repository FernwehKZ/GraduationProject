<template>
  <div id="user-manage">
    <div class="top">
      <el-input placeholder="请输入内容" class="input-with-select" style="width: 20%">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
    <div class="user-table">
      <el-table
          border
          :data="userData">
        <el-table-column
            label="用户 ID"
            align="center"
            prop="_id">
        </el-table-column>
        <el-table-column
            label="昵称"
            show-overflow-tooltip
            prop="name">
        </el-table-column>
        <el-table-column
            label="用户头像"
            align="center"
            show-overflow-tooltip
            prop="icon">
          <template v-slot="scope">
            <img :src="scope.row.icon" height="100rem" width="100rem">
          </template>

        </el-table-column>
        <el-table-column
            width="160px"
            label="手机号"
            prop="phone">
        </el-table-column>
        <el-table-column
            label="性别"
            align="center"
            show-overflow-tooltip
            prop="sex">
        </el-table-column>
        <el-table-column
            label="年龄"
            align="center"
            show-overflow-tooltip
            prop="age">
        </el-table-column>

        <el-table-column
            width="200"
            align="center"
            label="操作">
          <template v-slot="scope">
            <el-button
                size="mini"
                @click="userEdit(scope.$index,scope.row)">
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
    <div>
      <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
<!--        @submit.native.prevent="userEdit">-->
<!--        ref="ruleForm"-->
        <el-form >
          <el-form-item label="用户名:" prop="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="phone">
            <el-input v-model.number="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄:" prop="age">
            <el-input v-model="userInfo.age"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio v-model="radio" label="女" @change="changeRadio">女</el-radio>
            <el-radio v-model="radio" label="男" @change="changeRadio">男</el-radio>
          </el-form-item>
          <el-form-item label="头像:" prop="headPic">
            <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload/userIcon'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <img v-if="userInfo.icon" :src="userInfo.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
<!--          <el-form-item label="用户头像:" prop="icon" >-->
<!--              <img :src="userInfo.icon" height="100rem" width="100rem">-->
<!--              <el-button type="primary" >上传头像</el-button>-->
<!--          </el-form-item>-->
          <el-form-item>
<!--            native-type="submit"-->
            <el-button type="primary" @click="userSave(userInfo)">修改</el-button>
            <el-button type="danger" @click="dialogFormVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>

</template>

<script>

export default {
  name: 'UserList',
  data() {
    return {
      radio: '1',
      //页面展示
      userData: {},
      //编辑修改
      userInfo: {},
      dialogFormVisible: false,
    }
  },
  methods: {
    //展示用户信息
    async fetch() {
      const res = await this.$http.get('/user')
      this.userData = res.data
    },
    //删除用户
    async remove(index, row) {
      this.$confirm(`此操作将删除用户"${row.name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/user`, {data: {_id: row._id}}) // eslint-disable-line no-unused-vars
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.$router.go(0)
      })
    },
    userEdit(index, row) {
      this.userInfo = row
      this.name = row.name
      this.dialogFormVisible = true
    },
    changeRadio(val) {
      this.$set(this.userInfo, 'sex', '')
      this.userInfo.sex = val
    },
    //头像上传
    handleAvatarSuccess(res) {
      this.$set(this.userInfo,'icon',res.url)
      this.userInfo.icon = res.url
    },
    // 上传头像提示
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
    //保存，更新
    async userSave(){
      const res = await this.$http.put('/user',this.userInfo)// eslint-disable-line no-unused-vars
      await this.$router.go(0)
      this.$message({
        type:'success',
        message:'修改成功',
      })
    }

  },
  //自动执行
  created() {
    this.fetch()
  },
}
</script>

<style scoped>
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  margin-bottom: 30px;
}

.user-table {
  width: 90%;
  min-width: 900px;
  margin: 0 auto 30px;
}

.avatar-uploader .el-upload, i {
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