export const DEMO_NAMESPACE = 'demo'

export function DEMO_LIST (payload) {
  return {
    type: `${DEMO_NAMESPACE}/getDemoList`,
    payload
  }
}
