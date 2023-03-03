import { BlobServiceClient } from '@azure/storage-blob'
import Md5 from 'crypto-js/md5'
import Latin1 from 'crypto-js/enc-latin1'

let client
const storageUrl = 'https://ysminiproguatrgdiag.blob.core.chinacloudapi.cn/gac'
const sassString =
  'https://ysminiproguatrgdiag.blob.core.chinacloudapi.cn/gac?sv=2020-10-02&st=2022-08-07T09%3A48%3A00Z&se=2222-08-09T09%3A48%3A00Z&sr=c&sp=racwlt&sig=vPYHuACfAbEo4rLZ27FR4L6Yq41XKRusHT8UI5Hs5hg%3D'

const IMAGE_PATH = import.meta.env.VITE_APP_STORAGE_IMAGE
const VIDEO_PATH = import.meta.env.VITE_APP_STORAGE_VIDEO
const AUDIO_PATH = import.meta.env.VITE_APP_STORAGE_AUDIO

/**
 * 支持的MIME Type
 * @type {{mp4: string, gif: string, png: string, jpeg: string}}
 */
const BLOB_CONTENT_TYPE = {
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  webm: 'audio/webm',
  ogg: 'audio/ogg',
  wav: 'audio/wav',
}

/**
 * 获取文件后缀名
 * @param str
 * @returns {string}
 * @constructor
 */
const GET_SUFFIX = (str) => {
  return str.split('.').pop()
}

/**
 * 根据后缀名获取 MIME Type
 * 指定 MIME Type 的图片在浏览器中打开会触发查看图片操作，不指定会触发下载
 * @param siffix
 * @returns {{blobHTTPHeaders: {blobContentType: (*|string)}}}
 */
const get_options = (siffix) => {
  return {
    blobHTTPHeaders: {
      blobContentType: BLOB_CONTENT_TYPE[siffix] || 'application/octet-stream',
    },
  }
}

/**
 * 计算文件的md5值
 * @param file
 * @returns {Promise<unknown>}
 */
const get_file_md5 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      try {
        const name = Md5(Latin1.parse(e.target.result)).toString()
        resolve(name)
      } catch (e) {
        reject(e)
      }
    }
    reader.onerror = (err) => {
      reject(err)
    }
  })
}

/**
 * 初始化一个client
 * @returns {ContainerClient|*}
 * @private
 */
const _initClient = () => {
  if (client) return client
  const blobServiceClient = new BlobServiceClient(sassString)
  client = blobServiceClient.getContainerClient('')
  return client
}

/**
 * 上传到storage
 * @param file 文件
 * @param path_prefix 放文件的路径 scrm/image/
 * @returns {Promise<string>}
 */
const upload = async (file, path_prefix) => {
  const containerClient = _initClient()
  const name = await get_file_md5(file)
  const SIFFIX = GET_SUFFIX(file.name) //文件后缀名
  const path = `${path_prefix}${name}.${SIFFIX}` //文件存放路径
  const client = containerClient.getBlockBlobClient(path)
  const exist = await client.exists()
  if (exist) return `${storageUrl}/${path}`
  await client.uploadData(file, get_options(SIFFIX))
  return `${storageUrl}/${path}`
}

/**
 * 上传图片
 * @param file
 * @returns {Promise<string>}
 */
export const uploadImage = async (file) => {
  return upload(file, IMAGE_PATH)
}
/**
 * 上传视频
 * @param file
 * @returns {Promise<string>}
 */
export const uploadVideo = async (file) => {
  return upload(file, VIDEO_PATH)
}
/**
 * 上传音频
 * @param file
 * @returns {Promise<string>}
 */
export const uploadAudio = async (file) => {
  return upload(file, AUDIO_PATH)
}
