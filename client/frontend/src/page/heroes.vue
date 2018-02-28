<template>
  <el-col :span="18">
    <!--<el-table-->
      <!--:data="tableData"-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
        <!--label="日期"-->
        <!--width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"></i>-->
          <!--<span style="margin-left: 10px">{{ scope.row.date }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="姓名"-->
        <!--width="180">-->
        <!--<template slot-scope="scope">-->
          <!--<el-popover trigger="hover" placement="top">-->
            <!--<p>姓名: {{ scope.row.name }}</p>-->
            <!--<p>住址: {{ scope.row.address }}</p>-->
            <!--<div slot="reference" class="name-wrapper">-->
              <!--<el-tag size="medium">{{ scope.row.name }}</el-tag>-->
            <!--</div>-->
          <!--</el-popover>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)"><router-link to="/hero/1">编辑</router-link></el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
  </el-col>
</template>

<script>
  export default {
    created() {
//      this.getData()
      this.fetchData()
    },
    data() {
      return {
        heroes: [ ]
      }
    },
    methods: {
      getData() {
        let url = 'todos'
        this.$api.get(url, null, res => {
          this.heroes = res.data.data
          console.log(res)
        })
      },
      fetchData: function () {
        this.$http({
          method: 'get',
          url: 'http://localhost:3000/todos'
        }).then(res => {
          this.heroes = res.data.data
          console.log(this.heroes)
        }).catch(err => {
          console.log(err)
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
