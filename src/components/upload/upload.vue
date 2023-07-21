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
          <img
            v-if="checkFile(url) === 'image'"
            class="avatar"
            :src="url"
            alt="上传图片"
          />
          <video
            v-if="checkFile(url) === 'video'"
            class="avatar"
            :src="url"
          ></video>
          <audio
            v-if="checkFile(url) === 'audio'"
            class="avatar"
            :src="url"
          ></audio>
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click.stop="handlePictureCardPreview(url)"
            >
              <el-icon class="icon"><zoom-in /></el-icon>
            </span>
            <!-- 编辑 -->
            <span class="el-upload-list__item-preview">
              <el-icon class="icon" @click="edit"><Edit /></el-icon>
            </span>
            <span
              class="el-upload-list__item-preview"
              @click.stop="handleRemove(url)"
            >
              <el-icon class="icon"><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img
        v-if="checkFile(url) === 'image'"
        w-full
        :src="data.dialogImageUrl"
        alt="Preview Image"
      />
      <video
        v-if="checkFile(url) === 'video'"
        w-full
        :src="data.dialogImageUrl"
        alt="Preview Image"
        controls
      ></video>
      <audio
        v-if="checkFile(url) === 'audio'"
        w-full
        :src="data.dialogImageUrl"
        alt="Preview Image"
        controls
      ></audio>
    </el-dialog>

    <canvas ref="canvasRef" style="display: none"></canvas>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import { uploadFile } from '@/api/Upload/index'
import { fileInfo } from './handle.js'
import { ElMessage } from 'element-plus'
import { floor } from 'lodash-es'
import { checkFile } from '@/utils'
const emit = defineEmits(['update:url', 'editBack', ''])
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
  hasEditBack: {
    value: Boolean,
    default: false,
  },
  onSuccess: {
    value: Function,
    default: function () {
      return () => {}
    },
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
  let { initFileType } = props
  if (initFileType && !file.type.includes(initFileType)) {
    ElMessage.error(`上传${data.typeObj[initFileType].name}格式!`)
    return Promise.reject()
  }
  let type = file.type.split('/')[0]
  //验证是否为限制类型
  if (!Object.keys(data.typeObj).includes(type)) {
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
  let form = new FormData()
  form.append('file', file)
  const res = await uploadFile(form)
  if (!res?.data) return

  let firstFrameVideo = ''
  if (data.selectFileType === 'video') {
    firstFrameVideo = await createFirstFrameVideo(el).catch((err) => {
      console.error('上传首帧图失败', err)
    })
  }
  emitCallback(res?.data?.data?.url, firstFrameVideo, el)
}

const canvasRef = ref(null)
const createFirstFrameVideo = (el) => {
  return new Promise((resole) => {
    el.currentTime = 0.5
    el.addEventListener('canplay', async () => {
      const ctx = canvasRef.value
      ctx.width = el.videoWidth
      ctx.height = el.videoHeight
      ctx.getContext('2d').drawImage(el, 0, 0, el.videoWidth, el.videoHeight)
      // this.testUrl = ctx.toDataURL("image/png");
      const file = dataURLtoFile(
        ctx.toDataURL('image/jpeg'),
        Date.now().toString() + '.jpeg',
      )
      let form = new FormData()
      form.append('file', file)
      const res = await uploadFile(form)
      resole(res?.data?.data?.url)
    })
  })
}

//上传图片
const dataURLtoFile = (dataUrl, filename) => {
  let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

//点击编辑
const edit = (e) => {
  if (props.hasEditBack) {
    e.stopPropagation()
    emit('editBack')
  }
}

const emitCallback = (url, firstFrameVideo = '', el) => {
  const { height = 150, width = 0 } = el
  const ratio = floor(width / height, 4)
  el.width = floor(width, 2)
  el.height = floor(height, 2)
  //只用于上传
  if (props.onlyUpload) {
    props.onSuccess({
      url: url,
      firstFrameVideo,
      fileType: data.selectFileType,
      el,
      ratio,
    })
    return
  }
  if (typeUrlString.value) {
    emit('update:url', url)
    props.onSuccess({
      url: url,
      firstFrameVideo,
      fileType: data.selectFileType,
      el,
      ratio,
    })
  } else {
    const arr = props.url
    arr.push(item)
    emit('update:url', arr)
    props.onSuccess({
      url: arr,
      firstFrameVideo,
      fileType: data.selectFileType,
      el,
      ratio,
    })
  }
}

/**
 * 文件上传成功回调
 */
const MonSuccess = (response, file, fileList) => {
  //console.log(response, file, fileList)
}
const MonError = () => {}
const MonChange = () => {}
const MonRemove = () => {}

/**
 * 删除图片
 * @param {*}
 */
const handleRemove = () => {
  emit('update:url', '')
}

const handlePictureCardPreview = (url) => {
  data.dialogImageUrl = url
  dialogVisible.value = true
}
</script>
<style lang="scss">
@import './index.scss';
</style>
