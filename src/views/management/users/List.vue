<template>
  <v-card width="100%" class="pa-4">
    <!-- search -->
    <v-form ref="searchForm" class="d-flex flex-wrap px-4" @submit="handleSubmitSearch" >
      <v-text-field v-model="searchForm.keyword" clearable class="mr-4 flex-grow-0" label="关键字" style="width: 200px" ></v-text-field>
      <div class="pt-5">
        <v-btn small color="primary" type="submit">搜索</v-btn>
        <v-btn small class="ml-4" @click="handleResetSearch">重置</v-btn>
      </div>
    </v-form>

    <!-- 表格 -->
    <v-data-table v-model="selection" show-select class="mt-4" item-key="id"
                  :headers="headers" :items="userPage.content"
                  :server-items-length="userPage.total"
                  @update:page="handlePageChange"
                  @update:items-per-page="handlePageSizeChange" >

      <!-- 表头 -->
      <template v-slot:top>
        <v-toolbar class="mb-2" flat :color="selection.length ? 'grey lighten-4' : 'white'" :elevation="selection.length ? 1 : 0"  >
          <v-toolbar-title v-if="!selection.length">用户列表</v-toolbar-title>
          <template v-else>
            <v-btn icon @click="selection = []" >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>
              {{ `已选择 ${selection.length} 项` }}
            </v-toolbar-title>
          </template>

          <v-spacer></v-spacer>

          <template v-if="selection.length" >
            <v-btn color="error" class="ml-2" @click="handleBatchDel" >批量删除</v-btn>
          </template>
          <save-dialog v-else :save-dialog.sync="saveDialog" :item-id="editItemId" @saved="handleItemSaved">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" v-bind="attrs" v-on="on" >新增用户</v-btn>
            </template>
          </save-dialog>
        </v-toolbar>
      </template>

      <!-- 自定义列渲染 -->
      <template v-slot:item.enabled="{ item }">
        <v-switch inset class="mt-0" hide-details readonly v-model="item.enabled"></v-switch>
      </template>
      <template v-slot:item.locked="{ item }">
        <v-switch inset class="mt-0" hide-details readonly v-model="item.locked"></v-switch>
      </template>
      <template v-slot:item.limit="{ item }">{{ formatLimit(item.limit)}}</template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="editItem(item)" class="mr-2" color="primary darken-1" outlined>
          <v-icon left  >mdi-pencil</v-icon>
          <span>编辑</span>
        </v-btn>
        <v-btn @click="deleteItem(item)" color="error darken-1" outlined>
          <v-icon left >mdi-delete</v-icon>
          <span>删除</span>
        </v-btn>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
import SaveDialog from "@/views/management/users/components/SaveDialog"
import {DelUser, ListUser} from "@/api/admin/management/users"
import {formatSize} from "@/util/numberUtils"

export default {
  components: {SaveDialog},
  data: () => ({
    headers: [
      { text: 'ID', value: 'uid', sortable: false },
      { text: '邮箱', value: 'email', sortable: false },
      { text: '姓名', value: 'name', sortable: false },
      { text: '等级', value: 'level', sortable: false },
      { text: '限额', value: 'limit', sortable: false },
      { text: '启用', value: 'enabled', sortable: false},
      { text: '锁定', value: 'locked', sortable: false},
      { text: '操作', value: 'actions', sortable: false, align: 'right' },
    ],
    userPage: {},
    pageParams: {
      page: 1,
      size: 10
    },
    searchForm: {
      keyword: null,
    },
    selection: [],
    saveDialog: false,
    editItemId: null,
  }),
  created () {
    this.initialize()
  },
  watch: {
    saveDialog(val) {
      val || this.closeSaveDialog()
    }
  },
  methods: {
    formatLimit(size) {
      return formatSize(size)
    },
    initialize () {
      let params = Object.assign({}, this.searchForm, this.pageParams)
      ListUser(params).then(res => this.userPage = res.data)
      this.selection = []
    },
    handlePageChange(page) {
      this.pageParams.page = page
      this.initialize()
    },
    handlePageSizeChange(size) {
      this.pageParams.size = size > 0 ? size : 999
      this.initialize()
    },
    handleSubmitSearch() {
      this.initialize()
    },
    handleResetSearch() {
      this.$refs.searchForm.reset()
      this.initialize()
    },
    handleItemSaved() {
      this.initialize()
    },
    editItem (item) {
      this.editItemId = item.id
      this.saveDialog = true
    },
    deleteItem (item) {
      this.$confirm({
        content: `确认要删除 ${item.email} 吗 ?`,
        ok: () => {
          DelUser(item.id).then(() => {
            this.initialize()
          })
        }
      })
    },
    handleBatchDel() {
      this.$confirm({
        content: `确认要删除所选择的 ${this.selection.length} 项数据吗 ?`,
        ok: () => {
          Promise.all(this.selection.map(u => DelUser(u.id)))
              .then(() => this.initialize())
        }
      })
    },
    closeSaveDialog() {
      this.saveDialog = false
      this.$nextTick(() => {
        this.editItemId = null
      })
    },
  },
}
</script>

<style scoped>

</style>