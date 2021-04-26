import request from '@/utils/request'

export async function getDemo (params) {
  return request('/api/demo', {
    method: 'POST',
    data: params
  })
}
