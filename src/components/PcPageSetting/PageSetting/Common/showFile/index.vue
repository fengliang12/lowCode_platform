<template>
  <div class="show_file">
    <template v-if="src">
      <video v-if="checkFile(src) === 'video'" :src="src" class="video-box" />
      <img v-else :src="src" style="width: 100%" alt class="avatar" />
    </template>
    <div class="el-upload-list__item-actions">
      <!-- 预览 -->
      <el-icon class="icon" @click.stop="handlePictureCardPreview(src)"
        ><ZoomIn
      /></el-icon>
      <!-- 编辑 -->
      <el-icon class="icon" @click.stop="edit"><EditPen /></el-icon>
      <!-- 删除 -->
      <el-icon class="icon" @click.stop="del"> <Delete /></el-icon>
    </div>

    <!-- 预览效果 -->
    <el-dialog :visible.sync="dialog.dialogVisible" append-to-body>
      <video
        v-if="checkFile(dialog.dialogImageUrl) === 'video'"
        :src="dialog.dialogImageUrl"
        width="100%"
        controls
      />
      <img v-else :src="dialog.dialogImageUrl" width="100%" alt="" />
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { checkFile } from '@/utils/handle'

defineProps(['src'])
const emit = defineEmits(['del', 'edit'])
/**
 * 图片预览弹窗
 */
const dialog = reactive({
  dialogVisible: false,
  dialogImageUrl: ''
})
const handlePictureCardPreview = (url) => {
  dialog.dialogImageUrl = url
  dialog.dialogVisible = true
}

/**
 * 编辑
 */
const edit = () => {
  emit('edit')
}
/**
 * 删除
 */
const del = () => {
  emit('del')
}
onMounted(() => {})
</script>
<style lang="scss" scoped>
.show_file {
  width: 200px;
  height: 200px;
  position: relative;
  margin-top: 20px;
  border: 1px solid #cccccc;
  overflow: hidden;
  margin-right: 10px;
}
.el-upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}

.el-upload-list__item-actions:hover {
  opacity: 1;
}
.el-upload-list__item-actions:after {
  display: inline-block;
  content: '';
  height: 100%;
  vertical-align: middle;
}

.el-upload-list__item-actions:hover .icon {
  display: inline-block;
  cursor: pointer;
}
.el-upload-list__item-actions .icon {
  margin-left: 15px;
}
</style>
