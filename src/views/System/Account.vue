<!--  -->
<template>
  <div>
    <!-- 新增用户form表单 -->
    <el-dialog :title="state.formTitle" v-model="state.userFormDialogVisible">
      <el-form
        ref="userForm"
        :model="state.userFormData"
        :rules="state.rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="state.userFormData.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm"> 重置</el-button>
          <el-button type="primary" @click="handelConfirm"> 确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 角色表单 -->
    <el-dialog title="设置角色" v-model="state.showSetRoleDialog">
      <el-select @change="upRole" value="选择角色" placeholder="选择角色">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-dialog>

    <!-- 系统用户表格 -->
    <div style="margin: 0 10px; text-align: left">
      <el-row>
        <el-col :span="4" :xs="24">
          <div>
            <p>部门管理</p>
            <el-tree
              :data="deptOptions"
              :props="{ label: 'name', children: 'children' }"
              :expand-on-click-node="false"
              ref="deptTreeRef"
              highlight-current
              default-expand-all
              @node-click="handleNodeClick"
            />
          </div>
        </el-col>
        <el-col :span="20" :xs="24">
          <div style="margin: 5px 10px; text-align: left">
            <el-button type="primary" @click="toAddUser">{{
              $t('button.wadd')
            }}</el-button>
          </div>
          <el-table :data="tableData">
            <el-table-column prop="username" label="用户名"> </el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column label="状态">
              <template #default="scope">
                <el-switch
                  id="switch"
                  v-model="scope.row.status"
                  active-color="green"
                  inactive-color="red"
                  @change="(value: boolean) => commitStatusChange(value, scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300px">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="toSetRole(scope.row.id)"
                  >{{ $t('button.wempower') }}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="resetPw(scope.row.id)"
                  >{{ $t('button.wresetPassWord') }}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="toEditUser(scope.row)"
                  >{{ $t('button.wedit') }}</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="deleteUser(scope.row.id)"
                  >{{ $t('button.wdelete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 分页 -->
      <el-row style="float: right">
        <el-pagination
          layout="total,sizes,prev,pager,next,jumper"
          :total="state.users.length"
          :current-page="state.currentPage"
          :page-sizes="[5, 10, 20, 30, 50, 100]"
          @current-change="handelCurrentChange"
          @size-change="handelSizeChange"
        >
        </el-pagination>
      </el-row>
    </div>
  </div>
</template>

<!-- 定义name,让keep-alive的include检索 -->
<script lang="ts">
export default {
  name: 'account',
}
</script>

<script setup lang="ts">
import {
  addSysUser,
  deleteSysUsers,
  getAllSysUsers,
  updateStatus,
  updateSysUser,
  resetPassword,
  setRole,
  getDepartment,
  getDepUsers,
} from '@/api/system/User'
import { getAllRoles } from '@/api/system/role'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/notification/style/css'
import {
  ComponentInternalInstance,
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  Ref,
} from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ElMessage, ElMessageBox } from 'element-plus'
import { isEmpty } from 'lodash-es'

const { proxy } = getCurrentInstance() as ComponentInternalInstance

// 部门数据
const deptOptions = ref(undefined)
const queryParams = reactive({
  id: 2,
})

// 系统用户表单
const state = reactive({
  users: [],
  currentPage: 1, //当前页
  pageSize: 10, //每页显示10条
  userFormDialogVisible: false,
  userFormData: {
    username: '',
  },
  rules: {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
      { min: 2, max: 10, message: '应该输入2到10位字符', trigger: 'blur' },
    ],
  },
  formTitle: '',
  showSetRoleDialog: false,
  currentUserId: 0,
})
interface Role {
  id: number
  name: string
}

const tableData = computed(() => state.users)
const roles: Ref<Array<Role> | null> = ref(null)

// 初始化
onMounted(() => {
  getTreeselect()
  getUsers()
})
// 获取系统用户
const getUsers = () => {
  getDepUsers(queryParams.id).then((result: any) => {
    state.users = result.data.data
  })
}
// 获取部门数据

const getTreeselect = () => {
  getDepartment().then((response: any) => {
    deptOptions.value = response.data.data
  })
}
/** 节点单击事件 */
const handleNodeClick = (data: Node) => {
  queryParams.id = data.id
  getDepUsers(queryParams.id).then((result: any) => {
    state.users = result.data.data
  })
}
// 改变页
const handelCurrentChange = (val: number) => {
  state.currentPage = val
}

// 改变当前条数
const handelSizeChange = (val: number) => {
  state.pageSize = val
}

// 点击添加用户按钮
const toAddUser = () => {
  state.formTitle = '添加用户'
  state.userFormDialogVisible = true
}

// 确认添加或修改用户
const handelConfirm = () => {
  if (
    state.formTitle.startsWith('添加用户') &&
    !isEmpty(state.userFormData.username)
  ) {
    addSysUser(state.userFormData).then((res: any) => {
      if (res.data.data == 1) {
        ElMessageBox.alert('添加成功')
        getUsers()
        state.userFormDialogVisible = false
      }
    })
  } else if (
    state.formTitle.startsWith('修改用户') &&
    !isEmpty(state.userFormData.username)
  ) {
    updateSysUser(state.userFormData).then(() => {
      ElMessageBox.alert('更新成功')
      getUsers()
      state.userFormDialogVisible = false
    })
  } else {
    ElMessageBox.alert('用户名不能为空')
  }
}

// 重置用户信息
const resetForm = () => {
  state.userFormData = {
    username: '',
  }
}

// 删除用户
const deleteUser = (id: number) => {
  ElMessageBox.confirm('确认要删除当前用户吗?')
    .then(() => {
      deleteSysUsers(id).then(() => {
        ElMessage.success('删除成功')
        getUsers()
      })
    })
    .catch(() => {})
}

// 修改用户按钮
const toEditUser = (selecteUser: object) => {
  state.userFormData = JSON.parse(JSON.stringify(selecteUser))

  state.formTitle = '修改用户'
  state.userFormDialogVisible = true
}

interface User {
  id: number
  status: boolean
}

// 更新用户状态

const commitStatusChange = (value: boolean, user: User) => {
  ElMessageBox.confirm(value === false ? '冻结用户?' : '激活用户?')
    .then(() => {
      updateStatus(user.id, user.status).then(() => {
        ElMessage.success(value === false ? '已冻结' : '已激活')
      })
    })
    .catch(() => {
      getUsers()
    })
}

// 重设密码
const resetPw = (userId: number) => {
  ElMessageBox.confirm('重置该用户密码,请谨慎操作!').then(() => {
    resetPassword(userId).then(() => {
      ElMessage.success('密码已经重置成功')
    })
  })
}

// 设置角色按钮
const toSetRole = (userId: number) => {
  getAllRoles().then((result) => {
    roles.value = result.data.data
    state.currentUserId = userId
    state.showSetRoleDialog = true
  })
}

/**
 * 确认设置角色
 * @param roleId
 */
const upRole = (roleId: number) => {
  setRole(state.currentUserId, roleId).then((result: any) => {
    if (result.data.data === 1) {
      ElMessage.success('角色设置成功')
      getUsers()
      state.showSetRoleDialog = false
    }
  })
}
</script>
<style lang="scss" scoped></style>
