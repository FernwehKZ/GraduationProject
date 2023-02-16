<template>
  <div>
    <div class="addCategory">
      <el-form @submit.native.prevent="addCategory">
        <h1>新建类别</h1>
        <el-form-item label="名称">
          <el-input style="width: 150px" v-model="model.name"></el-input>
          <el-button style="margin-left: 15px" type="primary" native-type="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="categoryList">
      <h1>类别列表</h1>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="300px"></el-table-column>
        <el-table-column prop="name" label="类别名称"></el-table-column>
        <el-table-column
            width="200"
            align="center"
            label="操作">
          <template slot-scope="scope">

            <el-button
                size="mini"
                @click="categoryEdit(scope.$index,scope.row)"
            >
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
      <el-dialog title="编辑类别" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="类别名称" label-width="100px" prop="name">
            <el-input v-model="categoryInfo.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSave(categoryInfo)">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>

export default {
  name: "MovieCategory",
  props: {
    id: {}
  },
  data() {
    return {

      model: {},
      items: [],
      categoryInfo: {},
      form: {
        name: '',
      },
      dialogFormVisible: false,
    }


  },
  methods: {
    //保存新增分类
    async addCategory() {
      //http://localhost:3000/admin/api/
      const res = await this.$http.post('category', this.model)// eslint-disable-line no-unused-vars
      //跳转路由
      await this.$router.go(0)
      this.$message({
        type: 'success',
        message: '新增成功',
      })
    },
    //删除类别
    async remove(index, row) {
      this.$confirm(`此操作将删除分类"${row.name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/category`, {data: {_id: row._id}}) // eslint-disable-line no-unused-vars
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.$router.go(0)
      })
    },
    //编辑类别
    categoryEdit(index, row) {
      this.categoryInfo = row
      this.name = row.name
      this.dialogFormVisible = true
    },
    async editSave() {
      const res = await this.$http.put('/category', this.categoryInfo)// eslint-disable-line no-unused-vars
      await this.$router.go(0)
      this.$message({
        type: 'success',
        message: '修改成功',
      })
    },
    //查找分类
    async fetch() {
      const res = await this.$http.get('/category')
      this.items = res.data
    },
  },

  //自动执行
  created() {
    this.fetch()
  }
}
</script>

<style>

</style>