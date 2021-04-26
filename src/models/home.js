import { DEMO_NAMESPACE } from '@/actions/home'
import { getDemo } from '@/services/home'

export default {
  namespace: DEMO_NAMESPACE,
  state: {
    demoData: []
  },
  effects: {
    *getDemo ({ payload }, { call, put }) {
      const response = yield call(getDemo, payload)
      const { code, data } = response
      if (code == 0) {
        yield put({
          type: 'updateTaskData',
          payload: data.list
        })
      }
    }
  },
  reducers: {
    updateDemo (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
