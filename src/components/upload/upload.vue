<template>
  <div>
    <el-upload
      action=""
      :list-type="listType"
      :show-file-list="showFileList"
      :multiple="multiple"
      :before-upload="beforeUpload"
      :http-request="handleUpload"
      :on-success="MonSuccess"
      :on-error="MonError"
      :on-change="MonChange"
      :on-remove="MonRemove"
      class="avatar-uploader"
    >
      <template #default>
        <div v-if="data.onUploading" class="progress">
          <div class="elProgress">
            <el-progress
              type="circle"
              :width="65"
              :percentage="data.progressNum"
            />
          </div>
          <div class="abort" @click.stop="abortUploadFn">取消上传</div>
        </div>
        <el-icon v-if="!url" class="el-icon-plus avatar-uploader-icon"
          ><Plus
        /></el-icon>
        <div v-if="url && typeUrlString" class="avatar_box">
          <img class="avatar" :src="url" alt="上传图片" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click.stop="handlePictureCardPreview(url)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <!-- 编辑 -->
            <span class="el-upload-list__item-preview">
              <el-icon><Edit /></el-icon>
            </span>
            <span
              class="el-upload-list__item-preview"
              @click.stop="handleRemove(url)"
            >
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="data.dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { uploadFile } from '@/api/Upload/index'
import { fileInfo } from './handle.js'
import { ElMessage } from 'element-plus'
const emit = defineEmits(['update:url'])
const props = defineProps({
  url: {
    default: '',
  },
  // 是否多选
  multiple: {
    value: Boolean,
    default: false,
  },
  onlyUpload: {
    value: Boolean,
    default: false,
  },
  showFileList: {
    value: Boolean,
    default: false,
  },
  listType: {
    value: String,
    default: 'picture-card', // text/picture/picture-card
  },
  initFileType: {
    value: String,
    default: '',
  },
  maxSize: {
    // 文件大小
    value: Number,
    default: 0,
  },
})

const dialogVisible = ref(false)

const data = reactive({
  onUploading: false,
  progressNum: 0,
  dialogImageUrl: '',
  currentFile: null,
  selectFileType: '',
  typeObj: {
    image: {
      name: '图片',
      maxSize: 1000,
    },
    video: {
      name: '视频',
      maxSize: 10000,
    },
    audio: {
      name: '音频',
      maxSize: 10000,
    },
  },
})

/**
 * 取消上传
 */
const abortUploadFn = () => {}

// 判断url是不是字符串
const typeUrlString = computed(() => {
  return !(props.url instanceof Array)
})

/**
 * 文件上传之前，进行类型校验、文件大小校验，返回false、或者promise.reject不会再上传
 */
const beforeUpload = (file) => {
  console.log(file)
  let { initFileType } = props
  if (initFileType && !file.type.includes(initFileType)) {
    console.log(2)
    ElMessage.error(`上传${data.typeObj[initFileType].name}格式!`)
    return Promise.reject()
  }
  let type = file.type.split('/')[0]
  //验证是否为限制类型
  if (!Object.keys(data.typeObj).includes(type)) {
    console.log(3)
    ElMessage.error(
      `上传  ${Object.values(data.typeObj)
        .map((elem) => elem.name)
        .join('/')}  格式!`,
    )
    return Promise.reject()
  }
  const maxFileSize = props.maxSize || data.typeObj[type].maxSize
  const isLt500KB = file.size / 1024 < maxFileSize
  if (!isLt500KB) {
    ElMessage.warning(`文件大小最好不要超过${maxFileSize}KB，请压缩后上传!`)
    return Promise.resolve()
  }
  data.currentFile = file
  data.selectFileType = type
}

/**
 * 覆盖默认的上传行为，可以自定义上传的实现
 */
const handleUpload = async ({ file }) => {
  file = data.currentFile || file
  const el = await fileInfo(data.selectFileType, file)
  console.log('el', el)
  let form = new FormData()
  form.append('file', file)
  const res = await uploadFile(form)
  console.log('上传路径', res?.data?.data?.url)
  emit('update:url', res?.data?.data?.url)
}

/**
 * 文件上传成功回调
 */
const MonSuccess = (response, file, fileList) => {
  console.log(response, file, fileList)
}
const MonError = () => {}
const MonChange = () => {}
const MonRemove = () => {}

const handleRemove = (url) => {
  console.log(url)
}

const handlePictureCardPreview = (url) => {
  data.dialogImageUrl = url
  dialogVisible.value = true
}
</script>
<style lang="scss">
@import './index.scss';
</style>
