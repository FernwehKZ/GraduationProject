<template>
  <div id="user-manage">
    <div class="top">
      <el-input placeholder="请输入内容" class="input-with-select" style="width: 20%">
        <el-button slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
    </div>
    <div class="movie-table">
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
            width="50px"
            prop="sex">
        </el-table-column>
        <el-table-column
            label="年龄"
            align="center"
            width="50px"
            show-overflow-tooltip
            prop="age">
        </el-table-column>

        <el-table-column
            width="200"
            align="center"
            label="操作">
          <template v-slot="scope">
            <el-button
                size="mini">
              <!--            @click="handleEdit(scope.$index, scope.row)"-->
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

  </div>

</template>

<script>

export default {
  name: 'UserList',
  data() {
    return {
      userData: [],
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/user')
      this.userData = res.data
    },
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

.movie-table {
  width: 90%;
  min-width: 900px;
  margin: 0 auto 30px;
}
</style>