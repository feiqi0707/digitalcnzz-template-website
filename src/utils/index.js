import moment from 'moment'
const crypto = require('crypto')

export const formatNumber = num => {
  if (num) {
    let str = num.toString()
    let reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return str.replace(reg, '$1,')
  } else {
    return `${num}`
  }
}

export const getCurrentDate = () => {
  return moment().format('yyyyMMDD')
}
export const getTimeStamp = () => new Date().getTime()

// 构建签名字符串
export const buildStringToSign = options => {
  let arr = {}
  let toStringify = Object.assign(arr, options)
  let result = ''
  if (Object.keys(toStringify).length) {
    let keys = Object.keys(toStringify).sort()
    let list = new Array(keys.length)
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      if (toStringify[key] && String(toStringify[key])) {
        list[i] = `${key}=${toStringify[key]}`
      } else {
        list[i] = `${key}`
      }
    }
    result += list.join('&')
  }
  return result
}

// 根据参数和秘钥生成签名
export const sign = (stringToSign, secretKey) => {
  let appSecret = Buffer.from(secretKey, 'utf8')
  let signRes = crypto.createHmac('sha1', appSecret).update(stringToSign, 'utf8').digest('base64')
  return signRes
}

// 获取签名信息
export const getSignature = option => {
  let str = buildStringToSign(option)
  let csbSignature = sign(str, 'oDGJlnZhSu1UzLMy3gEYT/5hsfY=')
  return csbSignature
}
/**
 * 一维数组渲染成二维
 * @param {*}} size 二维中每一个数组的长度
 * @param {*} arr 带转换的一维数组
 * @returns 渲染后的二维数组
 */
export const level2ArrayRender = (size, arr) => {
  const level2Array = []
  let index = 0
  let tempArray = []
  for (let item of arr) {
    tempArray.push(item)
    index++
    if (index >= size) {
      index = 0
      level2Array.push(tempArray)
      tempArray = []
    }
  }
  let numberArr = new Array(size).fill(0)
  for (let index in numberArr) {
    if (arr.length % size === ++index) {
      level2Array.push(arr.slice(-index))
    }
  }
  return level2Array
}

export const handleNumberPercent = data => {
  let percent = Number(parseFloat(data) * 100).toFixed(2)
  return percent
}
