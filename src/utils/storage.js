const preKey = '__CACHE_'
export function setStorage (_key, value) {
  const key = preKey + _key
  const cacheList = JSON.parse(localStorage.getItem('cacheList') || '[]')
  cacheList.push(key)
  localStorage.setItem('cacheList', JSON.stringify(cacheList))
  localStorage.setItem(key, value)
}

export function getStorage (_key) {
  const key = preKey + _key
  return localStorage.getItem(key)
}

export function removeAll () {
  const cacheList = JSON.parse(localStorage.getItem('cacheList') || '[]')
  cacheList.forEach(item => localStorage.removeItem(item))
  localStorage.removeItem('cacheList')
}
