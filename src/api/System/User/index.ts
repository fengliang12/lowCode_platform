import instance from '@/api/axios'

interface UserInfo {
  username: string
}

export function getAllSysUsers() {
  return instance({
    url: '/sysUser/list',
    method: 'get',
  })
}

// 添加管理员
export function addSysUser(user: UserInfo) {
  return instance({
    url: '/sysUser/',
    method: 'post',
    data: user,
  })
}

// 更新管理员
export function updateSysUser(user: UserInfo) {
  return instance({
    url: '/sysUser/',
    method: 'put',
    data: user,
  })
}

// 删除管理员
export function deleteSysUsers(sysUserIds: number) {
  return instance({
    url: '/sysUser/batch',
    method: 'delete',
    data: sysUserIds,
  })
}

// 更新账号激活状态
export function updateStatus(sysUserId: number, status: boolean) {
  return instance({
    url: '/sysUser/status/' + sysUserId + '/' + status,
    method: 'put',
  })
}

// 重置密码
export function resetPassword(sysUserId: number) {
  return instance({
    url: '/sysUser/resetPassword/' + sysUserId,
    method: 'put',
  })
}

// 设置角色
export function setRole(userId: number, roleId: number) {
  return instance({
    url: '/sysUser/role/' + userId + '/' + roleId,
    method: 'put',
  })
}

//  部门列表
export function getDepartment() {
  return instance({
    url: '/sysUser/department',
    method: 'get',
  })
}

//根据部门id查询用户
export function getDepUsers(depId: number) {
  return instance({
    url: '/sysUser/depUsers/' + depId,
    method: 'get',
  })
}
